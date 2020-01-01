import Taro, { useState } from "@tarojs/taro";
import {
  View,
  Input,
  Text,
  Button,
  Checkbox,
  Label,
  CheckboxGroup
} from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import { getRandomInt } from "../../utils/general";
import { updateQuestArr } from "../../actions/quest";
import "./style.scss";

function Mission(props) {
  const [playerIndex, setPlayerIndex] = useState(getRandomInt(props.number));
  const [questIndex, setQuestIndex] = useState(0);
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
    default:
      questArr = [3, 4, 4, 5, 5];
      break;
  }

  const handleChange = e => {
    setCheckedArr(e.target.value);
  };

  const handleNext = () => {
    if (checkedArr.length !== questArr[questIndex]) {
      setError(true);
    } else {
      setError(false);
      props.updateQuestArr(checkedArr);
      Taro.navigateTo({
        url: `/pages/Quest/index`
      });
    }
  };

  return (
    <View className="index Mission">
      <View>
        Player {playerIndex + 1}, your are the leader. Please nominate{" "}
        {questArr[questIndex]} players for the quest {questIndex + 1}.\n After\t
        appropriate discussion, all players vote for the proposal.\n If\t half\t
        players agree, the leader can choose {questArr[questIndex]} players\t
        below to start the quest phase.\n If not, the next player will be the\t
        leader and start nominate again.
      </View>
      <View>
        <CheckboxGroup className="Mission__checkboxes" onChange={handleChange}>
          {props.players.map((player, i) => (
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
  number: state.player.number
});

Mission.propTypes = {
  players: PropTypes.array,
  number: PropTypes.number,
  updateQuestArr: PropTypes.func
};

export default connect(mapStateToProps, { updateQuestArr })(Mission);
