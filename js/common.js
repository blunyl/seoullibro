const libraryCon = document.querySelector(".library");
const gangNam = document.querySelector(".gangNam");
const gangBuk = document.querySelector(".gangBuk");
const gangDong = document.querySelector(".gangDong");
const gangSeo = document.querySelector(".gangSeo");

const resultCon = document.querySelector(".resultCon");
const srch = document.querySelector(".searchInput");
const srchIcon = document.querySelector(".fa-magnifying-glass");

const apiKey = `69434344756c6169313034547156706e`;
const totPage = 1;
const libNum = 206;

let totalResults = 0;
let pageSize = 6;
let page = 1;
let groupSize = 5;
let filteredLibList = [];
let currentFilter = "";

const codesGangSeo = ["0001", "0002", "0006", "0025"];
const codesGangNam = ["0003", "0004", "0005", "0007", "0008", "0009"];
const codesGangDong = ["0010"];
const codesGangBuk = [
  "0011",
  "0012",
  "0013",
  "0014",
  "0015",
  "0016",
  "0017",
  "0018",
  "0019",
  "0020",
  "0021",
  "0022",
  "0023",
  "0024",
];

const fetchData = (libList, codes) => {
  return libList.filter((library) => codes.includes(library.GU_CODE));
};

const displayLib = (libraries) => {
  libraryCon.innerHTML = libraries.map(libHtml).join("");
};

const regionFunc = (element, codes) => {
  element.addEventListener("click", () => {
    currentFilter = codes;
    const filtered = fetchData(filteredLibList, codes);
    displayLib(pagiBtn(filtered, 1, pageSize));

    page = 1;
    pagination(filtered.length);
  });
};

const fetchLibrary = async (page) => {
  const apiUrl = new URL(
    `https://openapi.seoul.go.kr:8088/${apiKey}/json/SeoulPublicLibraryInfo/${totPage}/${libNum}/`
  );

  apiUrl.searchParams.append("pageSize", pageSize);
  apiUrl.searchParams.append("page", page);

  const response = await fetch(apiUrl);
  const data = await response.json();

  filteredLibList = data.SeoulPublicLibraryInfo.row;
  totalResults = data.SeoulPublicLibraryInfo.list_total_count;

  filterGangNam = fetchData(filteredLibList, codesGangNam);
  filterGangBuk = fetchData(filteredLibList, codesGangBuk);
  filterGangDong = fetchData(filteredLibList, codesGangDong);
  filterGangSeo = fetchData(filteredLibList, codesGangSeo);

  switch (currentFilter) {
    case codesGangNam:
      displayLib(pagiBtn(filterGangNam, page, pageSize));
      break;
    case codesGangBuk:
      displayLib(pagiBtn(filterGangBuk, page, pageSize));
      break;
    case codesGangDong:
      displayLib(pagiBtn(filterGangDong, page, pageSize));
      break;
    case codesGangSeo:
      displayLib(pagiBtn(filterGangSeo, page, pageSize));
      break;
    default:
      break;
  }
};

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
    <li class="name"><a href="#" onclick="showPopup('${name}', '${addr}', '${tel}', '${time}', '${close}', '${homePage}')">${name}</a></li>
  </ul>
    `;
};

const moveToPage = async (pageNum) => {
  page = pageNum;
  await fetchLibrary(page);
  pagination(filteredLibList.length);
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
    ${i == page ? "on" : ""} " onclick="moveToPage(${i})">
    ${i}</button>`;
  }

  paginationHtml += `
  <button class="page-link Next" aria-label="Next" onclick="moveToPage(${Math.min(
    Math.ceil(totalItems / pageSize),
    lastPage + 1
  )})">
    <span aria-hidden="true">&raquo;</span>
  </button>`;

  document.querySelector(".btnCon").innerHTML = paginationHtml;
};

const pagiBtn = (array, page_number, page_size) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

regionFunc(gangNam, codesGangNam);
regionFunc(gangDong, codesGangDong);
regionFunc(gangBuk, codesGangBuk);
regionFunc(gangSeo, codesGangSeo);

const pagiLib = async () => {
  await fetchLibrary(page);
};

pagiLib(filteredLibList.length);

const srchItems = (searchTerm) => {
  const regex = new RegExp(searchTerm, "gi");
  const srchResult = filteredLibList.filter((item) =>
    item.LBRRY_NAME.match(regex)
  );

  updateResults(srchResult);
};

const updateResults = (results) => {
  resultCon.innerHTML = "";

  if (results.length === 0) {
    resultCon.innerHTML = "<li>검색 결과가 없습니다.</li>";
    return;
  }

  results.forEach((item) => {
    const name = libHtml(item);
    const li = document.createElement("li");
    li.textContent = item.LBRRY_NAME;
    li.innerHTML = `<a href="#">${name}</a>`;
    resultCon.appendChild(li);
  });
};

fetchLibrary(1);

srch.addEventListener("input", function () {
  const srchTerm = srch.value.trim();
  if (srchTerm.length > 0) {
    srchItems(srchTerm);
  } else {
    resultCon.innerHTML = "";
  }
});

const performSrch = () => {
  const srchTerm = srch.value.trim();
  if (srchTerm.length > 0) {
    srchItems(srchTerm);
  } else {
    resultCon.innerHTML = "";
  }
};

srch.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    performSrch();
  }
});
srchIcon.addEventListener("click", performSrch);

const popupCon = document.createElement("div");
popupCon.className = "popupCon";
function showPopup(name, addr, tel, time, close, homePage) {
  const popupContent = `
    <section class="details">
      <p class="libName">${name}</p>
      <p>주소 : ${addr}</p>
      <p>전화번호 : ${tel}</p>
      <p>운영시간 : ${time}</p>
      <p>휴관일 : ${close}</p>
      <p class="homePage">홈페이지 : <a href="${homePage}" target="_blank">${homePage}</a></p>
      <button class="close" onclick="closePopup()">&#10060;</button>
    </section>
  `;
  popupCon.innerHTML = popupContent;
  document.body.appendChild(popupCon);
}

popupCon.addEventListener("click", (e) => {
  if (e.target === popupCon) {
    closePopup();
  }
});

function closePopup() {
  document.body.removeChild(popupCon);
}
