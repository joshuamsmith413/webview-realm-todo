import React from "react";
import { View, Text } from 'react-native';
import { ListItem, Overlay } from "react-native-elements";

// Action sheet contains a list of actions. Each action should have a `title`
// string and `action` function property. A "Cancel" action is automatically
// added to the end of your list of actions. You must also provide the
// closeOverlay function that this component will call to request that the
// action sheet be closed.
export function ActionSheet({ actions, visible, closeOverlay, task }) {
  const cancelAction = {
    title: "Cancel",
    action: closeOverlay,
  };
  return (
    <Overlay
      overlayStyle={{ width: "90%" }}
      isVisible={visible}
      onBackdropPress={closeOverlay}
    >
      <>
      <View style={{paddingBottom: 10, borderBottomWidth: 3}}>
        <Text style={{ fontSize: 30, paddingBottom: 5 }}>{task.summary}</Text>
        <Text style={{fontSize: 20, fontWeight: '300'}}>{task.description}</Text>
      </View>
        {[...actions, cancelAction].map(({ title, action }) => (
          <ListItem
            key={title}
            onPress={() => {
              closeOverlay();
              action();
            }}>
            <ListItem.Content>
                <ListItem.Title>
                  {title}
                </ListItem.Title>
            </ListItem.Content> 
          </ListItem>
        ))}
      </>
    </Overlay>
  );
}
