import React, { useState, useEffect } from "react";

import { View, Button } from "react-native";
import styles from "../stylesheet";

import { Overlay } from "react-native-elements";
import { ManageTeam } from "../components/ManageTeam";

import { useTasks } from "../providers/TasksProvider";
import { TaskItem } from "../components/TaskItem";
import { AddTask } from "../components/AddTask";

export function TasksView({ navigation, route }) {
  const { name } = route.params;

  const [overlayVisible, setOverlayVisible] = useState(false);

  const { tasks, createTask } = useTasks();
  let something;
  if (tasks.length === 0) {
    something = [{
      id: 1,
      name: 'update tasks',
      description: 'give users the ability to edit tasks'
    }]
  } else something = tasks

  useEffect(() => {
    navigation.setOptions({
      headerRight: function Header() {
        return <AddTask createTask={createTask} />;
      },
      title: `${name}'s Tasks`,
    });
  }, []);

  return (
    <View>
      {something.map((task) =>
        task ? <TaskItem key={`${task._id}`} task={task} /> : null
      )}

      {name === "asdf My Project" ? (
        <>
          <View style={styles.manageTeamButtonContainer}>
            <Button
              title="Manage Team"
              onPress={() => setOverlayVisible(true)}
            />
          </View>
          <Overlay
            isVisible={overlayVisible}
            onBackdropPress={() => setOverlayVisible(false)}
          >
            <ManageTeam />
          </Overlay>
        </>
      ) : null}
    </View>
  );
}
