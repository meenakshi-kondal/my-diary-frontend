<template>
  <div class="page">
    <div class="diary-detail">
      <h2>{{ diary?.name }}</h2>
      <span>{{ diary?.reason }}</span>
      <div class="meta">
        <span
          >Page:
          {{ pageNumber }}</span
        >
        <div class="nav-icons">
          <span @click="goHome" title="Home">
            <font-awesome-icon icon="home"
          /></span>
          <span @click="goBack" title="Back">
            <font-awesome-icon icon="circle-left"
          /></span>
          <span @click="goNext" title="Next">
            <font-awesome-icon icon="circle-right"
          /></span>
        </div>
      </div>
    </div>

    <div class="paper">
      <textarea
        v-model="content"
        @input="handleInput"
        maxlength="2000"
        spellcheck="false"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        placeholder="Start writing your thoughts..."
      />
    </div>
  </div>
</template>

<script>
import {
  getDiaryContent,
  createDiaryPage,
  saveDiaryPage,
} from "../services/diaryPageService";
import { getDiaryDetails } from "../services/diaryService";
import { debounce } from "../utils/debounce";

export default {
  props: ["diaryData"],
  data() {
    return {
    content:"",
      pageNumber: 1,
      diary: null,
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    this.diary = await getDiaryDetails(id);
    this.pageNumber = this.diary.occupiedPages === 0 ? 1 : this.diary.occupiedPages;
    if (this.diary.occupiedPages > 0) {
      this.getDiaryContent(this.diary.occupiedPages, id);
    }
  },
  methods: {
    handleInput: debounce(function () {
      if (this.content.length > 2000) {
        this.content = this.content.slice(0, 2000);
      }
      this.autoSave();
    }, 1000),

    async autoSave() {
      if (!this.diary) return;

      await saveDiaryPage({
        diary_id: this.diary._id,
        pageNumber: this.pageNumber,
        description: this.content,
      });
    },

    async getDiaryContent(pageNumber, id) {
      const data = await getDiaryContent(id, pageNumber);
      this.content = data.description;
    },

    goHome() {
      this.$router.push("/dashboard");
    },

    goBack() {
      if(this.pageNumber > 1) {
        this.pageNumber -= 1;
        this.getDiaryContent(this.pageNumber, this.diary._id);
        return;
      }
        this.$router.back();
      },

    async goNext() {
      if (!this.diary) return;

      if (this.content.length < 1000) {
        alert("Fill this page before going to next");
        return;
      }

      const nextPage = this.pageNumber + 1;

      await getDiaryContent({
        diary_id: this.diary._id,
        pageNumber: nextPage,
        description: "",
      });

      this.pageNumber = nextPage;
      this.content = "";
      }
    },
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  padding: 15px;
}
.diary-detail {
  display: flex;
  justify-content: space-between;
  align-item: center;
}
.meta {
  color: black;
  margin-bottom: 10px;
}
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.paper {
  position: relative;
  flex: 1;
  margin-top: 5px;
}
textarea {
  width: 100%;
  height: 85vh;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 32px;
  padding: 32px 20px 20px 60px;
  border: none;
  outline: none;
  resize: none;
  background: repeating-linear-gradient(
    to bottom,
    #ffffff,
    #ffffff 31px,
    #dbeafe 32px
  );
  overflow: hidden;
  opacity: 0.9;
}
.nav-icons {
  cursor: pointer;
  gap: 10px;
  display: flex;
  color: black;
}
.paper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 45px;
  height: 100%;
  width: 2px;
  background: #ef4444;
}

.page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-image: url("/page-background.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0.6;
  z-index: -1;
}
</style>
