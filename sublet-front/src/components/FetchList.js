import { useEffect, useState } from "react";

function FetchPost() {
  const [postInfo, setPostInfo] = useState([]);
  const getPostInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const json = await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/post`
        , requestOptions)
    ).json();

    setPostInfo(json)
  };

  useEffect(() => {
    getPostInfo();
  }, []);


  const post = Array.from(postInfo)

  return post
}

function FetchReservation() {
  const [reservationInfo, setReservationInfo] = useState([]);
  const getReservationInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const json = await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/reservation`
        , requestOptions)
    ).json();

    setReservationInfo(json)
  };

  useEffect(() => {
    getReservationInfo();
  }, []);


  const reservation = Array.from(reservationInfo)

  return reservation
}

function FetchReservationByPostKey(post_key) {
  const [reservationInfo, setReservationInfo] = useState([]);
  const URL = `${process.env.REACT_APP_BACKEND_URL}/reservation/post?key=` + post_key

  const getPostInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    const json = await (
      await fetch(
        URL, requestOptions)
    ).json();

    setReservationInfo(json)
  };

  useEffect(() => {
    getPostInfo();
  }, []);


  const reservation = Array.from(reservationInfo)

  return reservation
}

async function FetchDeleteReservation(key_num) {

  const requestOptions = {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key: key_num
    })
  };

  await (
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/reservation`
      , requestOptions)
  ).json();
};

function FetchReservationPost(user_id, post_key, start_day, end_day, pay) {

  const getReservationInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        post_key: post_key,
        r_start_day: start_day,
        r_end_day: end_day,
        pay: pay
      })
    };
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/reservation`
      , requestOptions)
      .then(res => res.json())
      .then(response => {
        console.log('result reservation', response)
      })
      .catch((e) => {
        console.log('[error] reservation', e)
      })
  };

  getReservationInfo()
}

function DeletePost(key) {
  const link = `${process.env.REACT_APP_BACKEND_URL}/post/${key}`
  const DeletePost = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      path: '/'
    };

    fetch(link, requestOptions)
      .then(res => res.json())
      .then(response => {
        console.log('result DeletePost', response)
      })
      .catch((e) => {
        console.log('[error] DeletePost', e)
      })
  };
  DeletePost()
}

function FetchLogin({ id, password }) {
  const login = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        password: password
      }),
      path: '/'
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, requestOptions)
      .then(res => res.json())
      .then(response => {
        console.log('result login', response)
      })
      .catch((e) => {
        console.log('[error] login', e)
      })
  };
  login()
}

function Logout() {
  const logout = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      path: '/',
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, requestOptions)
      .then(res => res.json())
      .then(response => {
        console.log('result logout', response)
      })
      .catch((e) => {
        console.log('[error] logout', e)
      })
  };
  logout()
}

async function FetchImage(formData) {
  const requestOptions = {
    credentials: 'include',
    method: 'PUT',
    body: formData
  };

  await (
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/image`
      , requestOptions)
  ).json();
}

async function GetOneUser(user_id) {
  const [requestInfo, setRequestInfo] = useState([]);
  const URL = `${process.env.REACT_APP_BACKEND_URL}/user/${user_id}`

  const getUserInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    const json = await (
      await fetch(
        URL, requestOptions)
    ).json();

    setRequestInfo(json)
  }

  return requestInfo
}

function FetchGetRequest() {
  const [requestInfo, setRequestInfo] = useState([]);
  const URL = `${process.env.REACT_APP_BACKEND_URL}/request/`

  const getRequestInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    const json = await (
      await fetch(
        URL, requestOptions)
    ).json();

    setRequestInfo(json)
  };

  useEffect(() => {
    getRequestInfo();
  }, []);

  const request = Array.from(requestInfo)

  return request
}

function SignUp({ user_id, password, username, email, phone, school, gender, birth, student_id }) {
  const SignUp = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        password: password,
        username: username,
        email: email,
        phone: phone,
        school: school,
        gender: gender,
        birth: birth,
        student_id: student_id
      }),
      path: '/'
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/`, requestOptions)
      .then(res => res.json())
      .then(response => {
        console.log('result signup', response)
      })
      .catch((e) => {
        console.log('[error] signup', e)
      })
  };
  SignUp()
}

function FetchGetRequestByRequestId(id_list) {
  const [requestInfo, setRequestInfo] = useState([]);
  const URL = `${process.env.REACT_APP_BACKEND_URL}/request/requestId`

  const getRequestInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id_list
      })
    };
    const json = await (
      await fetch(
        URL, requestOptions)
    ).json();

    setRequestInfo(json)
  };

  useEffect(() => {
    getRequestInfo();
  }, []);

  const request = Array.from(requestInfo)

  return request

}
function VerifyEmail({ email }) {

  const link = `${process.env.REACT_APP_BACKEND_URL}/user/email`

  const requestOptions = {      //sendEmail 라우터로 보내버리기
    credentials: 'include',
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      {
        email: email
      }
    ),
  }

  fetch(link, requestOptions).then(res => res.json())
    .then(response => {
      console.log('result verify', response)
    })
    .catch((e) => {
      console.log('[error] verify', e)
    })
  return true
}

function VerifyUser({ method, tokenKey, verifyToken }) {
  //학교 인증은 우리가 확인(김과외처럼)
  const link = `${process.env.REACT_APP_BACKEND_URL}/user/verifyUser`
  const json = {
    "verify_email": method === 'email' ? 'true' : 'false',
    "verify_phone": method === 'phone' ? 'true' : 'false',
    "tokenKey": tokenKey,
    "verifyToken": verifyToken
  }

  const requestOptions = {      //sendEmail 라우터로 보내버리기
    method: "POST",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      json
    )
  };

  fetch(link, requestOptions).then(res => res.json())
    .then(response => {
      console.log('result verify', response)
    })
    .catch((e) => {
      console.log('[error] verify', e)
    })
  return true
}

async function DeleteRequest(key_num) {

  const requestOptions = {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key: key_num
    })
  };

  await (
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/request`
      , requestOptions)
  ).json();
};

function ConnectRequestPost(resquset_key, post_key) {
  const link = `${process.env.REACT_APP_BACKEND_URL}/request/post/${post_key}`
  const getReservationInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: resquset_key
      })
    };
    fetch(
      link,
      requestOptions)
      .then(res => res.json())
      .then(response => {
        console.log('result reservation', response)
      })
      .catch((e) => {
        console.log('[error] reservation', e)
      })
  };
}

export { VerifyUser, SignUp, VerifyEmail, GetOneUser, FetchLogin, DeleteRequest, FetchGetRequest, Logout, FetchDeleteReservation, FetchGetRequestByRequestId, FetchReservation, FetchPost, FetchReservationByPostKey, DeletePost, FetchImage, FetchReservationPost, ConnectRequestPost }