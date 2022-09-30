<template>
  <div
    class="w-[700px] bg-neutral-900 border-t-[13px] border-t-[#5356ee] rounded-t-2xl rounded-lg h-[300px]"
  >
    <div class="flex flex-wrap">
      <div class="w-3/12">
        <div class="flex flex-col m-3">
          <a :href="`https://mercari.com${listing.offers.url}`">
            <img
              class="rounded-lg"
              :src="listing.image.replace('_1.jpg', `_${thumbnail}.jpg`)"
              alt=""
            />
          </a>
          <div class="flex flex-row gap-1 mt-2">
            <img
              v-for="(image, index) in images"
              :key="image"
              :src="listing.image.replace('_1.jpg', `_${index + 1}.jpg`)"
              class="h-12 w-12 rounded-lg cursor-pointer"
              alt=""
              @click="thumbnail = index + 1"
            />
          </div>
        </div>
      </div>

      <div class="w-5/12">
        <div class="flex flex-col m-3">
          <h1 class="text-white text-[1.12rem] leading-relaxed font-bold">
            {{ listing.name }}
          </h1>
          <div class="flex place-items-center space-x-1">
            <h1 class="text-white text-[1.12rem] font-medium mr-2">
              {{
                Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(listing.offers.price)
              }}
            </h1>
            <span class="bg-[#5356ee] block text-white px-4 rounded text-xs">{{
              listing.offers.itemCondition
                .split("/")
                [listing.offers.itemCondition.split("/").length - 1].replace(
                  "Condition",
                  ""
                )
                .toUpperCase()
            }}</span>
            <span
              class="bg-[#5356ee]/100 saturate-150 block text-white px-4 rounded text-xs"
              >{{
                listing.brand.name ? listing.brand.name.toUpperCase() : "N/A"
              }}</span
            >
          </div>
          <div class="overflow-auto h-[150px] border border-white/10 rounded">
            <p class="text-white text-sm p-1">
              {{ listing.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-4/12">
        <div class="flex-1 align-middle place-items-center">
          <div class="flex justify-end m-3">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-white cursor-pointer"
                :class="{ 'text-[#5356ee] fill-[#5356ee]': saved }"
                @click="$emit('toggleSaved')"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </span>
          </div>
          <div class="flex justify-center place-items-center mt-[25px]">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 fill-[#5356ee]"
              >
                <path
                  fill-rule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span class="text-white text-lg ml-1 font-medium">username589</span>
            <span class="text-[#5356ee] text-lg font-medium ml-1">438</span>
          </div>
          <div class="flex flex-col items-center justify-center mt-2">
            <div class="flex">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7 text-yellow-500 fill-yellow-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7 text-yellow-500 fill-yellow-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7 text-yellow-500 fill-yellow-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7 text-yellow-500 fill-yellow-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7 text-yellow-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </span>
            </div>
            <div class="flex flex-col text-center">
              <a
                :href="`https://www.mercari.com/transaction/buy/${
                  listing.offers.url.split('/')[
                    listing.offers.url.split('/').length - 2
                  ]
                }/`"
                class="px-16 py-1 bg-[#5356ee] text-white hover:bg-[#5356ee]/50 transistion-all duration-300 font-bold rounded mt-2"
              >
                Purchase
              </a>
              <a
                :href="`https://www.ebay.com/sch/i.html?_from=R40&_nkw=${encodeURIComponent(
                  listing.name
                )}&_sacat=139973&rt=nc&LH_Sold=1&LH_Complete=1`"
                class="px-16 py-1 bg-[#5356ee] text-white hover:bg-[#5356ee]/50 transistion-all duration-300 font-bold rounded mt-2"
              >
                Similar Sold
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Listing } from "../types/types";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      thumbnail: 1,
      images: [] as string[],
    };
  },

  mounted() {
    this.thumbnail = 1;
    this.images = [
      this.listing.image,
      this.listing.image.replace("_1.jpg", "_2.jpg"),
      this.listing.image.replace("_1.jpg", "_3.jpg"),
    ];
  },

  props: {
    listing: {
      type: Object as () => Listing,
      required: true,
    },
    saved: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
