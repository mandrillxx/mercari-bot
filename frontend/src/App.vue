<template>
  <section>
    <div class="container mx-auto pt-24">
      <div class="flex flex-col gap-4">
        <h1 class="text-4xl font-bold text-white">Saved Listings</h1>
        <div class="grid grid-cols-2 gap-12">
          <listing-item
            v-for="listing in savedListings"
            :key="listing"
            :listing="listing"
            :saved="savedListings.includes(listing)"
            @toggleSaved="toggleSaved(listing)"
          />
        </div>

        <h1 class="text-4xl font-bold text-white">New Listings</h1>
        <div class="grid grid-cols-2 gap-12">
          <listing-item
            v-for="listing in listings"
            :key="listing"
            :listing="listing"
            :saved="savedListings.includes(listing)"
            @toggleSaved="toggleSaved(listing)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import type { Listing } from "./types/types";
import { defineComponent } from "vue";
import { io, Socket } from "socket.io-client";
import ListingItem from "./components/ListingItem.vue";

export default defineComponent({
  components: { ListingItem },
  data() {
    return {
      savedListings: [] as Listing[],
      listings: [] as Listing[],
      socket: null as Socket | null,
    };
  },

  async mounted() {
    this.socket = io("http://localhost:3000");

    this.socket.on("newListings", (listings: Listing[]) => {
      this.listings = [...listings, ...this.listings];
      console.dir(this.listings);
    });
  },

  methods: {
    toggleSaved(listing: Listing) {
      console.dir(listing);
      if (this.savedListings.includes(listing)) {
        this.savedListings = this.savedListings.filter(
          (savedListing) => savedListing !== listing
        );
      } else {
        this.savedListings = [...this.savedListings, listing];
      }
    },
  },
});
</script>
