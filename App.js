import React from "react";
import { View, StatusBar, Platform } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Constants } from "expo";
import { green, white } from "./utils/colors";
import { MaterialIcons } from "@expo/vector-icons";

import DeckList from "./components/DeckList";
import NewDeck from "./components/AddDeck";
import DeckDetail from "./components/DeckDetail";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import { setLocalNotification } from "./utils/helpers";

function ViewBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Deck List",
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="list" size={30} color={tintColor} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="add" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      title: "Home"
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? green : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : green,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ViewBar backgroundColor={green} barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}
