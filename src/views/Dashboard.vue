<template>
  <div class="dashboard">
    <Header />

    <div v-if="!currentDiary" class="content">
      <button class="add-btn" @click="showDialog = true">+ Add Diary</button>

      <div class="card-container">
        <div
          class="card"
          v-for="diary in diaries"
          :key="diary.id"
          @click="$router.push(`/diary/${diary._id}`)"
        >
          <h3>{{ diary.name }}</h3>
          <p> {{ diary.occupiedPages }} / {{ diary.totalPages }}</p>

          <div class="progress">
            <div
              class="progress-fill"
              :style="{
                width: (diary.occupiedPages / diary.totalPages) * 100 + '%',
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <DiaryPage
      v-if="currentDiary"
      :diaryData="currentDiary"
      @back="closeDiaryPage"
      @save="saveDiaryEntry"
    />

    <Dialog
      :visible="showDialog"
      @close="showDialog = false"
      @save="handleSave"
    />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Dialog from "../components/Dialog.vue";
import DiaryPage from "./DiaryPage.vue";
import { getDiaries, createDiary } from "../services/diaryService";
export default {
  components: {
    Header,
    Dialog,
    DiaryPage,
  },
  data() {
    return {
      diaries: [],
      showDialog: false,
      currentDiary: null,
    };
  },
  async mounted() {
    this.diaries = await getDiaries();
  },
  methods: {

    async handleSave(data) {
      const user = JSON.parse(localStorage.getItem("user"));
        const newDiary = await createDiary({
          user_id: user.id,
          name: data.name,
          reason: data.reason,
        });

        this.diaries.push(newDiary);
        this.showDialog = false;

        this.$router.push(`/diary/${newDiary._id}`);
    },
  },
}
</script>

<style scoped>
.content {
  padding: 20px;
}

.add-btn {
  padding: 10px 15px;
  background: #eadae4;
  color: black;
  font-weight: 600;
  border: 2px solid #dccad5;
  border-radius: 6px;
  cursor: pointer;
}
.dashboard::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("/images.jpeg");
  background-size: cover;
  background-position: center;
  opacity: 0.2;

  z-index: -1;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
}

.card {
  width: 200px;
  padding: 15px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow);
  cursor: pointer;
}

.progress {
  height: 6px;
  background: #eee;
  border-radius: 5px;
  margin-top: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
}
</style>
