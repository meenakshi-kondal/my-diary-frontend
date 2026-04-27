<template>
  <header class="topbar">
    <!-- Left: Logo -->
    <div class="logo">📝 My-Diary</div>

    <div class="profile">
      <font-awesome-icon icon="user"  @click="toggleMenu" />

      <div v-if="showMenu" class="dropdown">
        <p @click="goProfile">My Profile</p>
        <p @click="logout">Logout</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "TopBar",
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    goProfile() {
      alert("Go to Profile");
    },
    logout() {
      alert("Logged out");
    },
  },
};
</script>

<style scoped>
.profile {
  color: black;
}
.topbar {
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  background: #eadae4;
  color: white;
  align-items: center;
}

.logo {
  font-size: 18px;
  font-weight: bold;
  color:black;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  right: 20px;
  top: 55px;
  background: white;
  color: black;
  border-radius: 6px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
</style>