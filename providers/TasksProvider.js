import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Task } from "../schemas";
import { useAuth } from "./AuthProvider";

const TasksContext = React.createContext(null);

const TasksProvider = ({ children, projectPartition }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

  useEffect(() => {
    // Enables offline-first: opens a local realm immediately without waiting
    // for the download of a synchronized realm to be completed.
    const OpenRealmBehaviorConfiguration = {
      type: 'openImmediately',
    };
    const config = {
      schema: [Task.schema],
      sync: {
        user: user,
        partitionValue: projectPartition,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
        error: (_session, error) => {
          (error) => {
            console.warn(error.name, error.message);
          };
        },
      },
    };
    // open a realm for this particular project
    Realm.open({schema: [Task.schema]}).then((projectRealm) => {
      realmRef.current = projectRealm;

      const syncSession = realmRef.current.syncSession;
      if (!!syncSession) {

        syncSession.addProgressNotification(
          "upload",
          "reportIndefinitely",
          (transferred, transferable) => {
            console.log(`${transferred} bytes has been transferred`);
            console.log(
              `There are ${transferable} total transferable bytes, including the ones that have already been transferred`
              );

              if (!syncSession.isConnected()) {
                console.warn("Realm sync isn't connected");
              }
            },
            );
          }

            const syncTasks = projectRealm.objects("Task");
            let sortedTasks = syncTasks.sorted("summary");
            setTasks([...sortedTasks]);
            sortedTasks.addListener(() => {
              setTasks([...sortedTasks]);
            });
        });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setTasks([]);
      }
    };
  }, [user, projectPartition]);

  const createTask = (summary, description) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectRealm.create(
        "Task",
        new Task({
          summary: summary || "New Task",
          isComplete: false,
          description: description,
          partition: projectPartition,
        })
      );
    });
  };

  const updateTask = (taskToUpdate, summary, description) => {

    realmRef.current.write(() => {
      taskToUpdate.summary = summary
      taskToUpdate.description = description
    })
  }

  const setTaskStatus = (task, isComplete) => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      task.isComplete = isComplete;
    });
  };

  // Define the function for deleting a task.
  const deleteTask = (task) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.delete(task);
      setTasks([...projectRealm.objects("Task").sorted("summary")]);
    });
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <TasksContext.Provider
      value={{
        createTask,
        deleteTask,
        setTaskStatus,
        updateTask,
        tasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useTasks = () => {
  const task = useContext(TasksContext);
  if (task == null) {
    throw new Error("useTasks() called outside of a TasksProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return task;
};

export { TasksProvider, useTasks };
