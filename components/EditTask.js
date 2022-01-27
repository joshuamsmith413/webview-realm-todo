import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { Overlay, Input } from "react-native-elements";

export function EditTask(props) {


    return (
        <>
        <Overlay isVisible={props.isEditing} onBackdropPress={() => props.setIsEditing(false)}>
            <View style={{width: 200, height: 400}}>
                    <Text>Task name</Text>
                    <Input 
                        value={props.task.name}
                    />
                    <Text>Description</Text>
                    <Input
                        value={props.task.description}
                    />
            {/* <Button />  */}
            </View>
        </Overlay>
        </>
    );
}