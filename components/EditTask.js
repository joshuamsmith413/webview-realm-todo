import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { Overlay, Input } from "react-native-elements";
import { useTasks } from "../providers/TasksProvider";

export function EditTask(props) {
    const [updatedSummary, setUpdatedSummary] = useState(props.task.summary);
    const [updatedDescription, setUpdatedDescription] = useState(props.task.description);
    const [overlayDisplayed, setoverlayDisplayed] = useState(true);
    const { updateTask } = useTasks();

    const handleOnPress = () => {
        props.setIsEditing(false)
        updateTask(props.task, updatedSummary, updatedDescription)
    }

    return (
        <>
        <Overlay isVisible={props.isEditing} onBackdropPress={() => props.setIsEditing(false)}>
            <View style={{width: 200, height: 400}}>
                    <Input
                        label="Task Summary"
                        value={updatedSummary}
                        onChangeText={setUpdatedSummary}
                    />
                    <Input
                        label="Task Description"
                        value={updatedDescription}
                        onChangeText={setUpdatedDescription}
                    />
            <Button
                title="Update"
                onPress={handleOnPress}
            />
            </View>
        </Overlay>
        </>
    );
}
