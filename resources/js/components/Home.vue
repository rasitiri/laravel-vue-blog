<template>
  <div class="container mx-auto grid grid-cols-3 gap-4">
    <div class="lg:col-span-2 col-span-3 py-3">
      <publish></publish>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="limit"
        infinite-scroll-disabled="busy"
      >
        <post
          data-aos="zoom-in"
          data-aos-offset="100"
          data-aos-easing="ease-out-back"
          v-for="post in data"
          :key="post.id"
          :body="post.post"
          :author="post.user.name"
          :postedTime="post.created_at"
          :postId="post.id"
          :authorId="post.user.id"
        ></post>
      </div>
    </div>
    <friends-list></friends-list>
  </div>
</template>

<script>
import Publish from "./Publish";
import Post from "./Post";
import FriendsList from "./FriendsList";

export default {
  components: {
    Publish,
    Post,
    FriendsList
  },
  data() {
    return {
      data: [],
      busy: false,
      limit: 10
    };
  },
  methods: {
    loadMore() {
      return this.$store.dispatch("posts").then(res => {
        const append = res.slice(
          this.data.length,
          this.data.length + this.limit
        );
        this.data = this.data.concat(append);
        this.busy = false;
      });
    }
  },
  created() {
    this.$store.dispatch("user");
    this.loadMore();
  }
};
</script>