<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Login</h2>

      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />

      <button @click="handleLogin">Login</button>

      <p class="link-text">
        Don’t have an account?
        <span @click="$router.push('/signup')">Create</span>
      </p>
    </div>
  </div>
</template>

<script>
import { login } from "../services/authService";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async handleLogin() {
      const res = await login({
        email: this.email,
        password: this.password,
      });

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        this.$router.push("/");
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
  background: var(--primary-hover);
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