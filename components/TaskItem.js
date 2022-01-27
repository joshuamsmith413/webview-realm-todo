import React, { useState } from "react";
import { ListItem, Text } from "react-native-elements";
import { useTasks } from "../providers/TasksProvider";
import { ActionSheet } from "./ActionSheet";
import { EditTask } from './EditTask'

import styles from "../stylesheet";

export function TaskItem({ task }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { deleteTask, setTaskStatus } = useTasks();
  const actions = [
    {
      title: "Delete",
      action: () => {
        deleteTask(task);
      },
    },
    {
      title: "Edit",
      action: () => {
        setIsEditing(true)
      }
    }
  ];

  // For each possible status other than the current status, make an action to
  // move the task into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
  if (task.isComplete) {
    actions.push({
      title: "Mark incomplete",
      action: () => {
        setTaskStatus(task, false);
      },
    });
  }
  else {
    actions.push({
      title: "Mark complete",
      action: () => {
        setTaskStatus(task, true);
      },
    });
  }

  return (
    <>
      <EditTask 
        task={task} 
        isEditing={isEditing} 
        setIsEditing={setIsEditing} 
      /> 
        <ActionSheet
          visible={actionSheetVisible}
          closeOverlay={() => {
            setActionSheetVisible(false);
          }}
          actions={actions}
        />
        <ListItem
          key={task.id}
          onPress={() => {
            setActionSheetVisible(true);
          }}
          bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              {task.name}
              </ListItem.Title>
              <ListItem.Subtitle style={{ fontStyle: 'italic', fontSize: 10}}>
                {task.description}
              </ListItem.Subtitle>
          </ListItem.Content>
          {
            task.isComplete === true ? (
              <Text>&#10004; {/* checkmark */}</Text>
            ) : null
          }
        </ListItem>
      </> 
  );
}
