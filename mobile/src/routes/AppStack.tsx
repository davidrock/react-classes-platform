import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import Landing from "../pages/landing";
import GiveClasses from "../pages/give-classes";

export default function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown : false }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
      </Navigator>
    </NavigationContainer>
  );
}
