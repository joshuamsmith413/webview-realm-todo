import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider } from "./providers/AuthProvider";
import { TasksProvider } from "./providers/TasksProvider";
import { CounterProvider } from './providers/CounterProvider'

import { WelcomeView } from "./views/WelcomeView";
import { ProjectsView } from "./views/ProjectsView";
import { TasksView } from "./views/TasksView";
import { setCustomText } from 'react-native-global-props';
import { Logout } from "./components/Logout";
import CounterRedux from './views/CounterRedux';
import CounterContextView from './views/CounterContextView';
import { View } from "react-native";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counter from './src'


const store = createStore(counter);
const Stack = createStackNavigator();
const customTextProps = { 
  style: { 
    fontFamily: "Avenir"
  }
}
setCustomText(customTextProps);
const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome View"
            component={WelcomeView}
            options={{ title: "Task Tracker" }}
          />
          <Stack.Screen
            name="Projects"
            component={ProjectsView}
            title="ProjectsView"
            headerBackTitle="log out"
            options={{
              headerLeft: function Header() {
                return <Logout />;
              },
            }}
          />
          <Stack.Screen name="Task List">
            {(props) => {
              const { navigation, route } = props;
              const { user, projectPartition } = route.params;

              return (
                <TasksProvider user={user} projectPartition={projectPartition}>
                  <TasksView navigation={navigation} route={route} />
                </TasksProvider>
              );
            }}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
      // <>
      //   <View>
      //     <Provider store={store}>
      //       <CounterRedux foo='foo'/>
      //     </Provider>
      //     </View>
      //     <View>
      //     <CounterProvider>
      //       <CounterContextView />
      //     </CounterProvider>
      //   </View>
      // </>
  );
};

export default App;
