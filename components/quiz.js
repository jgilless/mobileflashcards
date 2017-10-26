import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { green, red, white } from "../utils/colors";

import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class Quiz extends Component {
  state = {
    index: 0,
    numCorrect: 0,
    showAnswer: false
  };

  static navigationOptions = () => {
    return {
      title: "Quiz"
    };
  };

  nextQuestion = correct => {
    const { numCorrect, index } = this.state;
    const newNumCorrect = correct ? numCorrect + 1 : numCorrect;

    this.setState({
      index: index + 1,
      numCorrect: newNumCorrect,
      showAnswer: false
    });
  };

  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification())
      .catch(e => console.log(e));
  }

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    const { title, questions } = params;
    const { index, showAnswer, numCorrect } = this.state;

    if (!title || !questions) {
      return null;
    }

    if (index === questions.length) {
      return (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.qa}>
              You got {numCorrect} out of {questions.length} correct.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => navigation.goBack()}
              title="Back To Quiz"
              color={green}
              accessibilityLabel="Correct"
            />
            <Button
              onPress={() => {
                this.setState({
                  index: 0,
                  numCorrect: 0,
                  showAnswer: false
                });
              }}
              title="Restart Quiz"
              color={red}
              accessibilityLabel="Restart Quiz"
            />
          </View>
        </View>
      );
    }

    const question = questions[index].question;
    const answer = questions[index].answer;
    const numQuestions = questions.length;

    return (
      <View style={styles.container}>
        <Text style={styles.numQuestions}>
          Question {index + 1}/{numQuestions}
        </Text>
        <View style={styles.textContainer}>
          <Text style={styles.qa}>{showAnswer ? answer : question}</Text>
          <Button
            onPress={() =>
              this.setState({
                showAnswer: !showAnswer
              })}
            title={showAnswer ? "Show Question" : "Show Answer"}
            color={green}
            accessibilityLabel={showAnswer ? "Show Question" : "Show Answer"}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.nextQuestion(true)}
            title="Correct"
            color={green}
            accessibilityLabel="Correct"
          />
          <Button
            onPress={() => this.nextQuestion(false)}
            title="Incorrect"
            color={red}
            accessibilityLabel="Incorrect"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  qa: {
    fontSize: 30
  },
  numQuestions: {
    fontSize: 20,
    alignSelf: "flex-start"
  }
});
export default Quiz;
