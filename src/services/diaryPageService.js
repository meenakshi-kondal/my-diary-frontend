import BASE_URL from "./api";

// Get pages of a diary
export const getDiaryContent = async (diaryId, pageNumber) => {
  const res = await fetch(`${BASE_URL}/get-page-content/${diaryId}/${pageNumber}`);
  return await res.json();
};

// Create page
export const createDiaryPage = async (data) => {
  const res = await fetch(`${BASE_URL}/add-page`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

export const saveDiaryPage = async (data) => {
  const res = await fetch(`${BASE_URL}/save-page`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};