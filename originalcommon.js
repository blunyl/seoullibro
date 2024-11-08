const libraryCon = document.querySelector('.library');
const gangNam = document.querySelector('.gangNam');
const gangBuk = document.querySelector('.gangBuk');
const gangDong = document.querySelector('.gangDong');
const gangSeo = document.querySelector('.gangSeo');

const apiKey = `4f546368536c61693531474d4a7874`;
const totPage = 1;
const libNum = 206;

// TODO:  전체 도서관 가져오기
// const listLib = (libList) => {
//   libList.forEach((library) => {
//     const seoulLib = libHtml(library);
//     // console.log("seoulLib : ", seoulLib);
//     libraryCon.innerHTML += seoulLib;
//   });
// };

// TODO: api 데이터 가지고 오기
// const fetchData = async () => {
//   const apiUrl = new URL(
//     `http://openapi.seoul.go.kr:8088/${apiKey}/json/SeoulPublicLibraryInfo/${totPage}/${libNum}/`
//   );
//   const response = await fetch(apiUrl);
//   const data = await response.json();
//   let libList = data.SeoulPublicLibraryInfo.row;

// console.log("data: ", data);
// console.log("liblist: ", libList);

// TODO: 지역 나눠서 목록 누를때 가지고오기
// gangNam.addEventListener("click", () => {
//   const gangNamLib = libList.filter((library) => {
//     const code = library.GU_CODE;
//     return (
//       code === "0003" ||
//       code === "0004" ||
//       code === "0005" ||
//       code === "0007" ||
//       code === "0008" ||
//       code === "0009"
//     );
//   });

//   libraryCon.innerHTML = "";
//   console.log(gangNamLib);
//   gangNamLib.forEach((library) => {
//     const libHtmlStr = libHtml(library);
//     libraryCon.innerHTML += libHtmlStr;
//   });
// });

// gangDong.addEventListener("click", () => {
//   const gangDongLib = libList.filter((library) => {
//     const code = library.GU_CODE;
//     return code === "0010";
//   });

//   libraryCon.innerHTML = "";
//   console.log(gangDongLib);
//   gangDongLib.forEach((library) => {
//     const libHtmlStr = libHtml(library);
//     libraryCon.innerHTML += libHtmlStr;
//   });
// });

// gangBuk.addEventListener("click", () => {
//   const gangBukLib = libList.filter((library) => {
//     const code = library.GU_CODE;
//     return (
//       code === "0011" ||
//       code === "0012" ||
//       code === "0013" ||
//       code === "0014" ||
//       code === "0015" ||
//       code === "0016" ||
//       code === "0016" ||
//       code === "0017" ||
//       code === "0018" ||
//       code === "0019" ||
//       code === "0020" ||
//       code === "0021" ||
//       code === "0022" ||
//       code === "0023" ||
//       code === "0024"
//     );
//   });

//   libraryCon.innerHTML = "";
//   console.log(gangBukLib);
//   gangBukLib.forEach((library) => {
//     const libHtmlStr = libHtml(library);
//     libraryCon.innerHTML += libHtmlStr;
//   });
// });

// gangSeo.addEventListener("click", () => {
//   const gangSeoLib = libList.filter((library) => {
//     const code = library.GU_CODE;
//     return (
//       code === "0001" || code === "0002" || code === "0006" || code === "0025"
//     );
//   });

//   console.log(gangSeoLib);
//   libraryCon.innerHTML = "";

//   gangSeoLib.forEach((library) => {
//     // const name = library.LBRRY_NAME;
//     // libraryCon.innerHTML += name;
//     const libHtmlStr = libHtml(library);
//     libraryCon.innerHTML += libHtmlStr;
//   });
// });

// listLib(libList);
// };

//분리
const fetchData = (libList, codes) => {
  return libList.filter((library) => codes.includes(library.GU_CODE));
};

const displayLib = (libraries) => {
  libraryCon.innerHTML = '';
  libraries.forEach((library) => {
    const libHtmlStr = libHtml(library);
    libraryCon.innerHTML += libHtmlStr;
  });
};

const gangNamFunc = (libList) => {
  gangNam.addEventListener('click', () => {
    const gangNamLib = fetchData(libList, [
      '0003',
      '0004',
      '0005',
      '0007',
      '0008',
      '0009',
    ]);
    console.log(gangNamLib);
    displayLib(gangNamLib);
  });
};

const gangDongFunc = (libList) => {
  gangDong.addEventListener('click', () => {
    const gangDongLib = fetchData(libList, ['0010']);
    console.log(gangDongLib);
    displayLib(gangDongLib);
  });
};

const gangBukFunc = (libList) => {
  gangBuk.addEventListener('click', () => {
    const gangBukLib = fetchData(libList, [
      '0011',
      '0012',
      '0013',
      '0014',
      '0015',
      '0016',
      '0016',
      '0017',
      '0018',
      '0019',
      '0020',
      '0021',
      '0022',
      '0023',
      '0024',
    ]);
    console.log(gangBukLib);
    displayLib(gangBukLib);
  });
};

const gangSeoFunc = (libList) => {
  gangSeo.addEventListener('click', () => {
    const gangSeoLib = fetchData(libList, ['0001', '0002', '0006', '0025']);
    console.log(gangSeoLib);
    displayLib(gangSeoLib);
  });
};

const fetchLibrary = async () => {
  const apiUrl = new URL(
    `http://openapi.seoul.go.kr:8088/${apiKey}/json/SeoulPublicLibraryInfo/${totPage}/${libNum}/`
  );
  const response = await fetch(apiUrl);
  const data = await response.json();
  const libList = data.SeoulPublicLibraryInfo.row;

  gangNamFunc(libList);
  gangDongFunc(libList);
  gangBukFunc(libList);
  gangSeoFunc(libList);
};

fetchLibrary();

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
  <ul class="result">
    <li class="name"><a href="#">${name}</a></li>
  </ul>
    `;
};
fetchData();

// TODO: pagination

function pagination() {
  let totalResults = 0;
  let pageSize = 2;
  let page = 1;
  let groupSize = 10;

  const fetchNews = async (url, category = 'general') => {
    try {
      url.searchParams.append('pageSize', pageSize);
      url.searchParams.append('page', page);
      url.searchParams.append('category', category);
      url.searchParams.append('country', 'kr');

      const response = await fetch(url);
      const data = await response.json();
      console.log(url);
      totalResults = data.totalResults;
      // console.log(totalResults);

      if (response.status !== 200) {
        throw new Error(data.message);
      }

      newsList = data.articles;
      renderNews(newsList);
      pagination(category);
    } catch (error) {
      errorRender(error.message);
    }
  };

  const moveToPage = async (pageNum, category) => {
    console.log('moveToPage', category);
    page = pageNum;
    const url = new URL(
      `https://newsapi.org/v2/top-headlines?&apiKey=${API_KEY}&category=${category}`
    );
    // console.log(url); `https://newsapi.org/v2/top-headlines?page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
    await fetchNews(url, category);
  };
}

const pagination = (category) => {
  console.log('카테고리 확인 ---', category);
  let pageGroup = Math.ceil(page / groupSize);
  let lastPage = Math.min(
    Math.ceil(totalResults / pageSize),
    pageGroup * groupSize
  );
  let firstPage = (pageGroup - 1) * groupSize + 1;

  let paginationHtml = `<button class="prev"><i class="fa-solid fa-arrow-left"></i></button>`;
  for (let i = firstPage; i <= lastPage; i++) {
    paginationHtml += `<button class="${
      i == page ? 'on' : ''
    }" onclick="moveToPage(${i}, '${category}')">${i}</button>`;
  }
  paginationHtml += `<button class="next"><i class="fa-solid fa-arrow-right"></i></button>`;

  document.querySelector('.pgcon').innerHTML = paginationHtml;
};
