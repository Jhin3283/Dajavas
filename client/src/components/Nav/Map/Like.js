import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { connect } from "react-redux";

const Div = styled.div`
  border: solid 1px wheat;
`;

function Like({
  location_name,
  long,
  lat,
  bookmarkList,
  id,
  userInfo,
  render,
  rerender,
}) {
  const selectLocation = bookmarkList.find((el) => el.id === id);

  const deleteList = () => {
    console.log("삭제", id, selectLocation);

    axios({
      url: `https://localhost:5000/map`,
      method: "delete",
      headers: { authorizationToken: userInfo.accessToken },
      data: { locationId: selectLocation.id },
    })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    rerender(!render);
  };
  return (
    <>
      {long !== undefined ? (
        <Div>
          <div>{location_name}</div>
          <div>{lat}</div>
          <div>{long}</div>
          <FontAwesomeIcon icon={faPencil} color="skyblue" margin="10px" />
          <FontAwesomeIcon
            icon={faTrashCan}
            onClick={() => deleteList()}
            color="skyblue"
          />
        </Div>
      ) : (
        <Div>
          <div>정보없음</div>
          <div>-</div>
          <div>-</div>
        </Div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer,
  };
};

export default connect(mapStateToProps)(Like);
