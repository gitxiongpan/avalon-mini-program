import Taro, { useState, useEffect } from "@tarojs/taro";
import { View, Button, Text, Input, Image } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import { shuffleArr } from "../../utils/general";
import { updatePlayers } from "../../actions/player";
import Cover from "../../assets/images/Cover.jpg";
import { resetRedux } from "../../actions/app";
import "./index.scss";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

function Index(props) {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  const [num, setNum] = useState(0);
  const [error, setError] = useState("");

  interface player {
    name: string;
    role: string;
    index: number;
    team: number;
    txt: string;
  }

  const initPlayer = () => ({ name: "", role: "", index: 0, team: 0, txt: "" });

  // todo: combine create players and assign role into one function
  // create empty player list
  const createPlayers = (n: number) => {
    const playerArr: player[] = [];
    for (let i = 0; i < n; i = i + 1) {
      let tempPlayer = initPlayer();
      playerArr.push(tempPlayer);
    }
    return playerArr;
  };

  // create randomed roles
  const genRoles = (n: number) => {
    let roles;
    let shuffledRoles;
    switch (n) {
      case 5:
        roles = ["Percival", "Merlin", "Servant", "Morgana", "Assassin"];
        break;
      case 6:
        roles = [
          "Percival",
          "Merlin",
          "Servant",
          "Servant",
          "Morgana",
          "Assassin"
        ];
        break;
      case 7:
        roles = [
          "Percival",
          "Merlin",
          "Servant",
          "Servant",
          "Morgana",
          "Assassin",
          "Mordred"
        ];
        break;
      case 8:
        roles = [
          "Percival",
          "Merlin",
          "Servant",
          "Servant",
          "Servant",
          "Morgana",
          "Assassin",
          "Mordred"
        ];
        break;
      case 9:
        roles = [
          "Percival",
          "Merlin",
          "Servant",
          "Servant",
          "Servant",
          "Servant",
          "Morgana",
          "Assassin",
          "Mordred"
        ];
        break;
      case 10:
        roles = [
          "Percival",
          "Merlin",
          "Servant",
          "Servant",
          "Servant",
          "Servant",
          "Morgana",
          "Assassin",
          "Mordred",
          "Oberon"
        ];
        break;
      default:
        setError("Number of players is not allowed.");
        return;
    }
    shuffledRoles = shuffleArr(roles);
    return shuffledRoles;
  };

  // assign roles to players
  const assignRoles = (roles: string[], playerArr: player[]) => {
    roles.forEach((role, i) => {
      playerArr[i].role = role;
      playerArr[i].index = i;
      playerArr[i].team = getTeam(role);
    });
    return playerArr;
  };

  // determine team
  const getTeam = role => {
    switch (role) {
      case "Servant":
        return 1;
      case "Merlin":
        return 1;
      case "Percival":
        return 1;
      case "Morgana":
        return 0;
      case "Assassin":
        return 0;
      case "Mordred":
        return 0;
      case "Oberon":
        return 0;
      default:
        return 0;
    }
  };

  const assignExtraInfo = playerArr => {
    const evilTeam = playerArr.filter(player => player.team === 0);
    let MerlinTxt = evilTeam.map(person => " " + (person.index + 1));
    const evilExceptOberon = evilTeam.filter(
      player => player.role !== "Oberon"
    );
    const evilTxt = evilExceptOberon.map(person => " " + (person.index + 1));
    playerArr.forEach(player => {
      switch (player.role) {
        case "Servant":
          player.txt =
            "You are in the good team, but you don't know if the other players are good or not.";
          break;
        case "Percival":
          const perc1 = playerArr.find(person => person.role === "Merlin");
          const perc2 = playerArr.find(person => person.role === "Morgana");
          player.txt = `You are in the good team. Player ${perc1.index} and ${perc2.index} are Merlin and Morgana, but you don\'t know which is which.`;
          break;
        case "Merlin":
          player.txt = `Guide your good team. The evil team are Players ${MerlinTxt}`;
          break;
        case "Assassin":
          player.txt = `Find the Merlin and kill him to win at the end of the game. Your evil team are Players ${evilTxt}.`;
          break;
        case "Morgana":
          player.txt = `You appear as Merlin in Percival\'s eye. Your evil team are Players ${evilTxt}.`;
          break;
        case "Mordred":
          player.txt = `Merlin cannot see you as an evil player. Your evil team are Players ${evilTxt}.`;
          break;
        case "Oberon":
          player.txt = `Your evil team are Players ${MerlinTxt}, but your evil friends don\'t seem to know you.`;
          break;
        default:
          player.txt = "TDB";
          break;
      }
    });
    return playerArr;
  };

  const handleInput = e => {
    setNum(parseInt(e.target.value, 10));
  };

  const handleStart = (n: number) => {
    let playerArr = createPlayers(n);
    const roles = genRoles(n);
    playerArr = assignRoles(roles, playerArr);
    playerArr = assignExtraInfo(playerArr);
    // update player redux
    props.updatePlayers(playerArr);
    // update number of plyars in redux
    //navigate to next page
    Taro.redirectTo({
      url: `/pages/Person/index`
    });
  };

  useEffect(() => {
    props.resetRedux();
  }, [props]);

  return (
    <View className="index">
      <Image src={Cover} />
      <View>Number of players</View>
      <Input className="numInput" type="number" onInput={handleInput} />
      <Text>{num} players</Text>
      <Button className="dec_btn btn" onClick={() => handleStart(num)}>
        Start
      </Button>
      {error !== "" && <Text>{error}</Text>}
    </View>
  );
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

Index.propTypes = {
  num: PropTypes.number,
  players: PropTypes.array
};

const mapStateToProps = state => ({
  players: state.player.players
});

export default connect(mapStateToProps, {
  updatePlayers,
  resetRedux
})(Index);
