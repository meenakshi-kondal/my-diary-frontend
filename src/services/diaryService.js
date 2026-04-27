import BASE_URL from "./api";

// Get all diaries
export const getDiaries = async () => {
  const res = await fetch(`${BASE_URL}/diaries`);
  return await res.json();
};

// Create diary
export const createDiary = async (data) => {
  const res = await fetch(`${BASE_URL}/add-diary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

export const getDiaryDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/diary-detail/${id}`);
  return await res.json();
};