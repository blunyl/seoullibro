const libraryCon = document.querySelector(".library");

// TODO:  전체 도서관 가져오기
const listLib = (libList) => {
  console.log("liblist: ", libList);

  libList.forEach((library) => {
    const seoulLib = libHtml(library);
    console.log("seoulLib : ", seoulLib);
    libraryCon.innerHTML += seoulLib;
  });
};

const apiKey = `4f546368536c61693531474d4a7874`;
const page = 1;
const libNum = 10;

//  data
const libHtml = (library) => {
  let name = library.LBRRY_NAME;
  let addr = library.ADRES;
  let tel = library.TEL_NO;
  let time = library.OP_TIME;
  let close = library.FDRM_CLOSE_DATE;
  let homePage = library.HMPG_URL;
  let addrValue = library.CODE_VALUE;
  let code = library.GU_CODE;
  let xcnts = library.XCNTS;
  let ydnts = library.YDNTS;

  return `
  <div class="libApi">
    <p class="name"><a href="#">${name}</a></p>
    <p class="name"><a href="#">${addr}</a></p>
    <p class="code"><a href="#">${code}</a></p>
    </div>
    `;
};

// TODO: 지역 섹션 나눠서 목록 누를때 가지고오기

//  api 데이터 가지고 오기
const fetchData = async () => {
  const apiUrl = new URL(
    `http://openapi.seoul.go.kr:8088/${apiKey}/json/SeoulPublicLibraryInfo/${page}/${libNum}/`
  );
  const response = await fetch(apiUrl);
  const data = await response.json();
  // let libList = data.SeoulPublicLibraryInfo.row;
  let libList = data["SeoulPublicLibraryInfo"]["row"];

  // console.log("liblist: ", libList);

  listLib(libList);
};
fetchData();

// TODO:  kakao map
// var mapContainer = document.getElementById("map"), // 지도를 표시할 div
//   mapOption = {
//     center: new kakao.maps.LatLng(37.56646, 126.98121), // 지도의 중심좌표
//     level: 9, // 지도의 확대 레벨
//   };

// var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// // 마커를 표시할 위치와 title 객체 배열입니다
// var positions = [
//   {
//     title: "대치도서관",
//     latlng: new kakao.maps.LatLng(37.499, 127.065),
//   },
// ];

// TODO: 원래 주석임 해제ㄴㄴ  ~126
// var imageSrc =
//     "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
//   imageSize = new kakao.maps.Size(24, 35), // 마커이미지의 크기입니다
//   imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
// var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
//   markerPosition = new kakao.maps.LatLng(37.4996157705058, 127.065915414443); // 마커가 표시될 위치입니다

// // 마커를 생성합니다
// var marker = new kakao.maps.Marker({
//   position: markerPosition,
//   image: markerImage, // 마커이미지 설정
// });
// marker.setMap(map);

// TODO:  여기서부터 쭉 해제
// for (var i = 0; i < positions.length; i++) {
//   // 마커를 생성합니다
//   var marker = new kakao.maps.Marker({
//     map: map, // 마커를 표시할 지도
//     position: positions[i].latlng, // 마커의 위치
//   });

//   // 마커에 표시할 인포윈도우를 생성합니다
//   var infowindow = new kakao.maps.InfoWindow({
//     content: positions[i].title, // 인포윈도우에 표시할 내용
//   });

//   // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
//   // 이벤트 리스너로는 클로저를 만들어 등록합니다
//   // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
//   kakao.maps.event.addListener(
//     marker,
//     "mouseover",
//     makeOverListener(map, marker, infowindow)
//   );
//   kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));
// }

// // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
// function makeOverListener(map, marker, infowindow) {
//   return function () {
//     infowindow.open(map, marker);
//   };
// }

// // 인포윈도우를 닫는 클로저를 만드는 함수입니다
// function makeOutListener(infowindow) {
//   return function () {
//     infowindow.close();
//   };
// }
