<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Signup</h2>

      <input v-model="name" placeholder="Name" />
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />

      <button @click="handleSignup">Signup</button>

      <p class="link-text">
        Already have an account?
        <span @click="$router.push('/login')">Login</span>
      </p>
    </div>
  </div>
</template>

<script>
import { signup } from "../services/authService";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    async handleSignup() {
      const res = await signup({
        name: this.name,
        email: this.email,
        password: this.password,
      });

      if (res._id) {
        this.$router.push("/login");
      } else {
        alert(res.message);
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.auth-card {
  background: var(--card);
  padding: 30px;
  border-radius: 12px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

button {
  background: var(--primary);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 6px;
}

button:hover {
  background: var(--primary-dark);
}

.link-text {
  text-align: center;
  font-size: 13px;
}

.link-text span {
  color: var(--primary);
  cursor: pointer;
  font-weight: bold;
}
</style>