import React, { useEffect, useRef, useState } from "react";
import { SubletPostStore } from "../store/SubletPostStore";



function searchAddressToCoordinate(address, map) {
  let infoWindow = new window.naver.maps.InfoWindow({
    anchorSkew: true
  });

  let coordinate_item = undefined;

  window.naver.maps.Service.geocode({
    query: address
  }, function (status, response) {
    if (status === window.naver.maps.Service.Status.ERROR) {
      console.log('status ERROR');
      return undefined;
    }
    //console.log(response.v2);
    if (response.v2.meta.totalCount === 0) {
      console.log('검색정보 없음');
      return undefined;
    }

    let htmlAddresses = [],
      item = response.v2.addresses[0],
      point = new window.naver.maps.Point(item.x, item.y);

    coordinate_item = item;
    //console.log(coordinate_item);

    // if (item.roadAddress) {
    //   htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
    // }

    // if (item.jibunAddress) {
    //   htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
    // }

    // if (item.englishAddress) {
    //   htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
    // }

    // infoWindow.setContent([
    //   '<div style="padding:10px;width:300px;line-height:150%;">',
    //   '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
    //   htmlAddresses[0],
    //   '</div>'
    // ].join('\n'));

    // map.setCenter(point);
    //infoWindow.open(map, point);
  });

  // 검색정보 있으면 좌표 반환
  return coordinate_item;
}


export default function Map(props) {
  const { posts, postExist, postAll } = SubletPostStore((state) => ({ post: state.post, postExist: state.postExist, postAll: state.postAll }));
  const setPostMarker = SubletPostStore((state) => state.setPostMarker);

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [markerAll, setMarkerAll] = useState(false);

  useEffect(() => {
    createMap();
    createMarker();
  }, [markerAll]);

  function createMap() {
    mapRef.current = new window.naver.maps.Map(document.getElementById("map"), {
      zoom: 13,
    });
    mapRef.current.setCursor("pointer");
  }

  function createMarker() {
    postAll?.map((post) => {
      let coordinate = searchAddressToCoordinate(post.position, mapRef.current);
      if (coordinate === undefined) {
        coordinate = searchAddressToCoordinate(props.city + " " + props.gu + " " + props.dong + " " + props.street + " " + props.street_number, mapRef.current);
        if (coordinate === undefined) {
          coordinate = { x: post.x_coordinate, y: post.y_coordinate };
        }
      }

      markerRef.current = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(coordinate.y, coordinate.x),
        map: mapRef.current
      })

      markerClickEvent(markerRef.current, post);
      post.marker = markerRef.current;

    });
    setPostMarker(true)
    setMarkerAll(true);
  }

  function markerClickEvent(marker, post) {
    window.naver.maps.Event.addListener(marker, "click", (e) => {
      const mapLatLng = new window.naver.maps.LatLng(Number(post?.y_coordinate), Number(post?.x_coordinate));
      //부드럽게 이동하기
      mapRef.current.panTo(mapLatLng, e?.coord);
    });
  }

  return (
    <div id="map" className="h-screen w-full rounded-lg" style={{ height: 'calc(100vh - 250px)' }} />
  )
}