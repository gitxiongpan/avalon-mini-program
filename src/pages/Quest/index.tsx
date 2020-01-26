import Taro, { useState } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import { resetRedux } from "../../actions/app";
import { updateQuestResult, proceedQuest } from "../../actions/quest";

function Quest(props) {
  const [curIndex, setCurIndex] = useState(0); // Voting player index
  const [failNum, setFailNum] = useState(0); // count all vote for fail
  const [isDisabled, setIsDisabed] = useState(false);
  const [isCompleted, setIscompleted] = useState(false);
  const [final, setFinal] = useState(); // final result
  const [gameOver, setGameOver] = useState(false);

  const handleSuccess = () => {
    Taro.showModal({
      title: "Selecting SUCCESS",
      content: "Click confirm to continue."
    }).then(res => {
      if (res.confirm) setIsDisabed(true);
    });
  };

  const handleFail = () => {
    if (props.players[parseInt(props.questArr[curIndex], 10)].team !== 0) {
      Taro.showModal({
        title: "Only evil team can select FAIL",
        content: "Please select SUCCESS."
      }).then(() => {
        return;
      });
    } else {
      Taro.showModal({
        title: "Selecting FAIL",
        content: "Click confirm to continue."
      }).then(res => {
        if (res.confirm) setIsDisabed(true);
        setFailNum(prev => prev + 1);
      });
    }
  };

  const handleNext = () => {
    // check if quest card selected
    if (isDisabled) {
      setCurIndex(prev => {
        const index = prev + 1;
        if (index >= props.questArr.length) {
          // update the quest result in redux
          if (failNum > 0) {
            props.updateQuestResult(0);
          } else {
            props.updateQuestResult(1);
          }
          setIscompleted(true);
          // check if game over
          if (checkGameOver()) {
            setGameOver(true);
          }
        }
        return index;
      });
      setIsDisabed(false);
    }
  };

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const checkGameOver = () => {
    console.log();
    if (props.questIndex >= 2) {
      const sum = props.questResults.reduce(reducer);
      console.log(sum);
      // Good team win
      if (sum >= 3) {
        setFinal(true);
        return true;
      }
      // Evil team win
      if (sum <= props.questIndex - 2) {
        setFinal(false);
        return true;
      }
    }
    return false;
  };

  const handleNextQuest = () => {
    props.proceedQuest();
    Taro.redirectTo({
      url: `/pages/Mission/index`
    });
  };

  const handleRestart = () => {
    props.resetRedux();
    Taro.redirectTo({
      url: `/pages/index/index`
    });
  };

  return (
    <View className="flex-wrap index">
      {isCompleted ? (
        <View>
          Mission
          {props.questResults[props.questIndex] ? (
            <Text className="good">Succcess</Text>
          ) : (
            <Text className="alert">Failed</Text>
          )}
          !
          <View>
            <Text className="alert">{failNum}</Text> player/s vote/s for fail.
          </View>
          <View>
            <Text className="good">{props.questArr.length - failNum}</Text>{" "}
            player/s vote/s for success.
          </View>
          <View>
            Quest Results:{" "}
            {props.questResults.map((result, index) => (
              <View key={"quest result" + index}>
                <Text>{index + 1}: </Text>
                <Text className={result ? "good" : "alert"}>
                  {result ? "Success" : "Fail"}
                </Text>
              </View>
            ))}
          </View>
          {gameOver && (
            <View>{final ? "Good team win!" : "Evil team win!"}</View>
          )}
          {gameOver ? (
            <Button onClick={handleRestart}>Start a new game</Button>
          ) : (
            <Button onClick={handleNextQuest}>Next Quest</Button>
          )}
        </View>
      ) : (
        <View>
          <Text>
            Player {parseInt(props.questArr[curIndex], 10) + 1}, please select a{" "}
            quest card. Note: good team can only select &ldquo;Success&ldquo;.
          </Text>
          <View className="flex">
            <Button
              className="btn"
              onClick={handleSuccess}
              disabled={isDisabled}
            >
              SUCCESS
            </Button>
            <Button className="btn" onClick={handleFail} disabled={isDisabled}>
              FAIL
            </Button>
          </View>
          <View className="flex">
            <Button className="btn" onClick={handleNext}>
              Next Player
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}

const mapStateToProps = state => ({
  questIndex: state.quest.index,
  questArr: state.quest.questArr,
  questResults: state.quest.questResults,
  players: state.player.players
});

Quest.propTypes = {
  questIndex: PropTypes.number,
  questArr: PropTypes.array,
  questResults: PropTypes.array,
  players: PropTypes.array
};

export default connect(mapStateToProps, {
  updateQuestResult,
  proceedQuest,
  resetRedux
})(Quest);
