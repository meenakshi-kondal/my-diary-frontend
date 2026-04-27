<template>
  <div v-if="visible" class="overlay">
    <div class="dialog">
      <h3>Add Diary</h3>

      <input v-model="name"  maxlength="20" placeholder="Diary Name*" />
      <div v-if="error" class="error-msg">{{ error }}</div>
      <textarea v-model="reason"   maxlength="100" placeholder="Why you want to write this?"></textarea>

      <div class="actions">
        <button @click="$emit('close')">Cancel</button>
        <button @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddDiaryDialog",
  props: ["visible"],
  data() {
    return {
      name: "",
      reason: "",
      error:"",
    };
  },
  methods: {
    save() {
    if (!this.name.trim()) {
      this.error = "Name is required";
      return;
    }

    // Optional: enforce limits again (extra safety)
    if (this.name.length > 20) {
      this.error = "Name must be max 20 characters";
      return;
    }

    if (this.reason.length > 100) {
      this.error = "Reason must be max 100 characters";
      return;
    }

    // Clear error if everything is valid
    this.error = "";

    this.$emit("save", {
      name: this.name,
      reason: this.reason,
    });

    // Reset fields
    this.name = "";
    this.reason = "";
  }
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background-color: var(--card);
  padding: 20px;
  width: 320px;
  border-radius: 12px;
  color: var(--text);
  border: 1px solid var(--border);
}

textarea {
  resize: none;
}
input, textarea {
  margin: 10px 0;
  width:300px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid var(--border);
  color: var(--text);
  outline: none;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.actions button:first-child {
  background: var(--secondary);
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.actions button:first-child:hover {
  background: var(--secondary-hover);
}

.actions button:last-child {
  background: var(--primary);
  color: var(--text);
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight:550;
  transition: 0.2s;
}

.actions button:last-child:hover {
  background: var(--primary-hover);
}
.error-msg {
  color:var(--danger);
  font-size:12px;
  padding:0
}
</style>