// @TODO: Figure out name typescript err
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import * as Screens from "../screens";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-restaurant" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-cart" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<TabOneParamList>();

// TabOneNavigator
function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="TabOneScreen"
        component={Screens.HomeScreen}
        options={{ headerTitle: "Order" }}
      />
    </HomeStack.Navigator>
  );
}

const CartStack = createStackNavigator<TabTwoParamList>();

function CartNavigator() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="Cart"
        component={Screens.CartScreen}
        options={{ headerTitle: "Cart" }}
      />
    </CartStack.Navigator>
  );
}
