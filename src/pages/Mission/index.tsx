import Taro, { useState } from "@tarojs/taro";
import { View, Button, Checkbox, CheckboxGroup } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";

import { updateQuestArr } from "../../actions/quest";
import "./style.scss";

function Mission(props) {
  const [checkedArr, setCheckedArr] = useState([]);
  const [isError, setError] = useState(false);
  let questArr: number[] = [];
  switch (props.number) {
    case 5:
      questArr = [2, 3, 2, 3, 3];
      break;
    case 6:
      questArr = [2, 3, 4, 3, 4];
      break;
    case 7:
      questArr = [2, 3, 3, 4, 4];
      break;
    case 8:
      questArr = [3, 4, 4, 5, 5];
      break;
    case 9:
      questArr = [3, 4, 4, 5, 5];
      break;
    case 10:
      questArr = [3, 4, 4, 5, 5];
      break;
    default:
      questArr = [3, 4, 4, 5, 5];
      break;
  }

  const handleChange = e => {
    setCheckedArr(e.target.value);
  };

  const handleNext = () => {
    if (checkedArr.length !== questArr[props.questIndex]) {
      setError(true);
    } else {
      setError(false);
      Taro.redirectTo({
        url: `/pages/Quest/index`
      });
      props.updateQuestArr(checkedArr);
    }
  };

  return (
    <View className="index Mission">
      <View>
        Player {props.leader + 1}, your are the leader. Please nominate{" "}
        {questArr[props.questIndex]} players for this QUEST{" "}
        {props.questIndex + 1}.
      </View>
      <View>
        After appropriate discussion, all players vote for the proposal. If half{" "}
        players agree, the leader can choose {questArr[props.questIndex]}{" "}
        players below to start the quest phase. If not, the next player will be{" "}
        the leader and start nominate again.
      </View>
      <View>
        <CheckboxGroup className="Mission__checkboxes" onChange={handleChange}>
          {props.players.map(player => (
            <Checkbox
              key={`checkbox${player.index}`}
              className="Mission__checkbox"
              value={player.index}
            >
              {player.index + 1}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </View>
      <Button onClick={handleNext}>Execute Quest</Button>
      {isError && (
        <View className="alert">
          Please select the right number of players for the quest.
        </View>
      )}
    </View>
  );
}

const mapStateToProps = state => ({
  players: state.player.players,
  number: state.player.number,
  questIndex: state.quest.index,
  leader: state.player.leader
});

Mission.propTypes = {
  players: PropTypes.array,
  number: PropTypes.number,
  updateQuestArr: PropTypes.func
};

export default connect(mapStateToProps, { updateQuestArr })(Mission);
