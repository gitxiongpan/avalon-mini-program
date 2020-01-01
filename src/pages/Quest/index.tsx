import Taro, { useState } from "@tarojs/taro";
import { View, Input, Text, Button } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";

function Quest(props) {
  const [curIndex, setCurIndex] = useState(0);
  const [isDisabled, setIsDisabed] = useState(false);
  let fail = 0;

  const handleSuccess = () => {
    Taro.showModal({
      title: "Selecting SUCCESS",
      content: "Click confirm to continue."
    }).then(res => {
      if (res.confirm) setIsDisabed(true);
    });
  };

  const handleFail = () => {
    if (props.players[parseInt(props.questArr[curIndex],10)].team !== 0) {
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
        fail += 1;
      });
    }
  };

  const handleNext = () => {
    if (isDisabled) {
      setCurIndex(prev=> prev+1);
      setIsDisabed(false);
      if (curIndex >= props.questArr.length) {
        if (fail > 0) {
  
        }
      };
    };
  };
  

  return (
    <View className="flex-wrp index">
      <Text>
        Player {parseInt(props.questArr[curIndex],10)+1}, please select a quest card. Note:
        good team can only select &ldquo;Success&ldquo;.
      </Text>
      <View className="flex">
        <Button className="btn" onClick={handleSuccess} disabled={isDisabled}>
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
  );
}

const mapStateToProps = state => ({
  questArr: state.quest.questArr,
  players: state.player.players,
});

Quest.propTypes = {};

export default connect(mapStateToProps, {})(Quest);
