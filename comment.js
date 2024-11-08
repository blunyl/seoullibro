const libraryCon = document.querySelector('.library');
const gangNam = document.querySelector('.gangNam');
const gangBuk = document.querySelector('.gangBuk');
const gangDong = document.querySelector('.gangDong');
const gangSeo = document.querySelector('.gangSeo');

const resultCon = document.querySelector('.resultCon');
const srch = document.querySelector('.searchInput');
const srchIcon = document.querySelector('.fa-magnifying-glass');
const popupCon = document.querySelector('.popupCon');

const apiKey = `4e485a44716c61693132326e6d436c4b`;
const totPage = 1;
const libNum = 206;

let totalResults = 0;
let pageSize = 6;
let page = 1;
let groupSize = 6;
let filteredLibList = [];
let currentFilter = '';

const codesGangSeo = ['0001', '0002', '0006', '0025'];
const codesGangNam = ['0003', '0004', '0005', '0007', '0008', '0009'];
const codesGangDong = ['0010'];
const codesGangBuk = [
  '0011',
  '0012',
  '0013',
  '0014',
  '0015',
  '0016',
  '0017',
  '0018',
  '0019',
  '0020',
  '0021',
  '0022',
  '0023',
  '0024',
];

const fetchData = (libList, codes) => {
  return libList.filter((library) => codes.includes(library.GU_CODE));
};

const displayLib = (libraries) => {
  libraryCon.innerHTML = libraries.map(libHtml).join('');
};

const regionFunc = (element, codes) => {
  element.addEventListener('click', () => {
    currentFilter = codes;
    const filtered = fetchData(filteredLibList, codes);
    displayLib(paginate(filtered, 1, pageSize));

    page = 1;
    pagination(filtered.length);

    // const regionLib = fetchData(filteredLibList, codes);
    // console.log(regionLib);
    // displayLib(filtered);
  });
};

const fetchLibrary = async (page) => {
  const apiUrl = new URL(
    `http://openapi.seoul.go.kr:8088/${apiKey}/json/SeoulPublicLibraryInfo/${totPage}/${libNum}/`
  );

  apiUrl.searchParams.append('pageSize', pageSize);
  apiUrl.searchParams.append('page', page);

  const response = await fetch(apiUrl);
  const data = await response.json();
  // console.log("data!!", data);
  // const libList = data.SeoulPublicLibraryInfo.row;
  filteredLibList = data.SeoulPublicLibraryInfo.row;
  totalResults = data.SeoulPublicLibraryInfo.list_total_count;

  // console.log("totalResult!!", totalResults);

  filterGangNam = fetchData(filteredLibList, codesGangNam);
  filterGangBuk = fetchData(filteredLibList, codesGangBuk);
  filterGangDong = fetchData(filteredLibList, codesGangDong);
  filterGangSeo = fetchData(filteredLibList, codesGangSeo);

  switch (currentFilter) {
    case codesGangNam:
      displayLib(paginate(filterGangNam, page, pageSize));
      break;
    case codesGangBuk:
      displayLib(paginate(filterGangBuk, page, pageSize));
      break;
    case codesGangDong:
      displayLib(paginate(filterGangDong, page, pageSize));
      break;
    case codesGangSeo:
      displayLib(paginate(filterGangSeo, page, pageSize));
      break;
    default:
      break;
  }

  regionFunc(gangNam, codesGangNam);
  regionFunc(gangDong, codesGangDong);
  regionFunc(gangBuk, codesGangBuk);
  regionFunc(gangSeo, codesGangSeo);
  // console.log(`libList`, libList);
  // console.log("filteredLibList!!", filteredLibList);
  // pagination(totalResults);
  pagination(filteredLibList.length);
};
fetchLibrary(filteredLibList.length);

const libHtml = (library) => {
  let name = library.LBRRY_NAME;
  let addr = library.ADRES;
  let tel = library.TEL_NO;
  let time = library.OP_TIME;
  let close = library.FDRM_CLOSE_DATE;
  let homePage = library.HMPG_URL;
  let code = library.GU_CODE;

  return `
  <ul class="result">
    <li class="name"><a href="#" onclick="showPopup('${name}', '${addr}', '${tel}', '${time}', '${close}', '${homePage}', event.clientX, event.clientY)">${name}</a></li>
  </ul>
    `;
};

const moveToPage = async (pageNum) => {
  page = pageNum;
  await fetchLibrary(page);
};

const pagination = (totalItems) => {
  let pageGroup = Math.ceil(page / groupSize);
  let lastPage = Math.min(
    Math.ceil(totalItems / pageSize),
    pageGroup * groupSize
  );
  let firstPage = (pageGroup - 1) * groupSize + 1;

  let paginationHtml = `
  <button class="page-link Previous" aria-label="Previous" onclick="moveToPage(${Math.max(
    1,
    firstPage - 1
  )})">
    <span aria-hidden="true">&laquo;</span>
  </button> `;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHtml += `<button class="page-link"
    ${i == page ? 'on' : ''} " onclick="moveToPage(${i})">
    ${i}</button>`;
  }

  paginationHtml += `
  <button class="page-link Next" aria-label="Next" onclick="moveToPage(${Math.min(
    Math.ceil(totalItems / pageSize),
    lastPage + 1
  )})">
    <span aria-hidden="true">&raquo;</span>
  </button>`;

  document.querySelector('.btnCon').innerHTML = paginationHtml;
};

const paginate = (array, page_number, page_size) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

// 검색 함수
const srchItems = (searchTerm) => {
  const regex = new RegExp(searchTerm, 'gi');
  const srchResult = filteredLibList.filter((item) =>
    item.LBRRY_NAME.match(regex)
  );

  // 검색 결과 표시
  updateResults(srchResult);
};

// 검색 결과 표시
const updateResults = (results) => {
  resultCon.innerHTML = '';

  if (results.length === 0) {
    resultCon.innerHTML = '<li>검색 결과가 없습니다.</li>';
    return;
  }

  results.forEach((item) => {
    const name = libHtml(item);
    const li = document.createElement('li');
    li.textContent = item.LBRRY_NAME;
    li.innerHTML = `<a href="#">${name}</a>`;
    resultCon.appendChild(li);
  });
};

// 페이지 로드 시 도서관 정보 가져오기
fetchLibrary(1);

// 입력 값이 변경될 때마다 검색
srch.addEventListener('input', function () {
  const srchTerm = srch.value.trim();
  if (srchTerm.length > 0) {
    srchItems(srchTerm);
  } else {
    resultCon.innerHTML = '';
  }
});

// 엔터 키 또는 검색 아이콘 클릭 시 검색
const performSrch = () => {
  const srchTerm = srch.value.trim();
  if (srchTerm.length > 0) {
    srchItems(srchTerm);
  } else {
    resultCon.innerHTML = '';
  }
};

srch.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    performSrch();
  }
});

srchIcon.addEventListener('click', performSrch);

// popup
function showPopup(name, addr, tel, time, close, homePage) {
  const popupContent = `
    <section class="details">
      <p class="libName">${name}</p>
      <p><i class="fa-regular fa-map"></i> 주소 : ${addr}</p>
      <p><i class="fa-solid fa-phone"></i> 전화번호 : ${tel}</p>
      <p><i class="fa-regular fa-clock"></i> 운영시간 : ${time}</p>
      <p><i class="fa-regular fa-circle-xmark"></i> 휴관일 : ${close}</p>
      <p><i class="fa-solid fa-house"></i> 홈페이지 : <a href="${homePage}" target="_blank">${homePage}</a></p>
      <button class="close" onclick="closePopup()">&#10060;</button>
    </section>
  `;

  popupCon.innerHTML = popupContent;
  document.body.appendChild(popupCon);
}

function closePopup() {
  document.body.removeChild(popupCon);
}
