import Taro, { useState, useEffect, Component, Config } from "@tarojs/taro";
import { View, Input, Text, Button } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import { updatePlayers } from "../../actions/player";
import "./index.scss";

function Person(props) {
  const [curIndex, setCurIndex] = useState(0);
  const [isView, setIsView] = useState(false);

  const handleView = () => {
    setIsView(prev => !prev);
  };

  const handleNext = () => {
    setIsView(false);
    setCurIndex(prev => prev + 1);
  };

  const handleLast = () => {
    setIsView(false);
    if (curIndex >= 0) setCurIndex(prev => prev - 1);
  };

  const handleStart = () => {
    Taro.navigateTo({
      url: `/pages/Mission/index`
    });
  };

  return (
    <View className="index Person">
      {/* <Button className='add_btn' onClick={() => handleClick(numOfPlayer)}>
				View
      </Button> */}
      <Text>Player {curIndex + 1}, click View button to view your role.</Text>
      <Button className="btn" onClick={handleView}>
        {isView ? "Hide Your Role" : "View Your Role"}
      </Button>
      {isView && (
        <View>
          <Text>
            Your are acting as{" "}
            <Text className="bold">{props.players[curIndex].role}</Text> in this{" "}
            game.{" "}
          </Text>
          <Text>{props.players[curIndex].txt}</Text>
        </View>
      )}
      <View className="navigation">
        <Button className="btn" onClick={handleLast}>
          Previous Player
        </Button>
        {curIndex < props.players.length - 1 ? (
          <Button className="btn" onClick={handleNext}>
            Next Player
          </Button>
        ) : (
          <Button className="btn" onClick={handleStart}>
            Start Mission
          </Button>
        )}
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  players: state.player.players
});

Person.propTypes = {
  players: PropTypes.array
};

export default connect(mapStateToProps, { updatePlayers })(Person);
