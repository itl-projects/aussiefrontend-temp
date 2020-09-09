<template>
  <v-card outlined min-height="400px">
    <v-row class="ma-6">
      <v-col cols="12">
        <div
          class="pa-4"
          style="display:flex; align-items: center;flex-wrap:wrap;"
        >
          <h2 style="font-size: 2rem;margin-right :2%;color: #444D59;">
            Photos
          </h2>
          <v-btn color="#0FEF70C6" dark id="file-btn">
            <input
              type="file"
              hidden
              id="file-input"
              multiple
              @change="getSelectedFiles"
            />
            <v-icon class="mr-2">mdi-camera-image</v-icon>upload photos
          </v-btn>
        </div>
      </v-col>
      <v-col v-if="photos.length <= 0" cols="12" class="px-4">
        <v-row v-if="image_loading">
          <v-col v-for="i in 10" :key="i" cols="4" md="3">
            <v-skeleton-loader type="image" class="mx-auto" max-width="300" />
          </v-col>
        </v-row>
        <v-row v-else justify="space-around">
          <v-sheet width="200" height="200" color="#f4f4f4" title="no_data">
            <v-img
              contain
              aspect-ratio="1"
              src="@/assets/images/no_data_found.svg"
              style="background:#ffffff"
            />
            <h3 style="font-weight:100;" class="mx-auto">
              No Photos uploaded yet !
            </h3>
          </v-sheet>
        </v-row>
      </v-col>
      <v-col
        v-else
        v-for="(item, i) in photos"
        :key="i"
        cols="4"
        md="3"
        class="px-4"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 6 : 2">
            <v-img
              :src="`${img_url}${item.image_path}`"
              aspect-ratio="1"
              style="cursor: pointer;"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >
                  <v-row align="baseline">
                    <v-col cols="12" class="text-center pa-0">
                      <v-btn class="pa-0 mr-3" small fab title="view" light
                        ><v-icon color="green" @click="viewPhoto(i)"
                          >mdi-image</v-icon
                        ></v-btn
                      >
                      <v-btn small fab title="delete" light
                        ><v-icon color="red" @click="deletePhoto(i)"
                          >mdi-trash-can-outline</v-icon
                        ></v-btn
                      >
                    </v-col>
                    <v-col v-if="itemToDelete == i" cols="12" class="py-0">
                      <div class="white text-center" style="height:auto">
                        <h5
                          class="ma-0 pa-0"
                          style="font-size:0.8rem;color:#ff0044;height: 10px;line-height: 2.5"
                        >
                          Are you sure ?
                        </h5>
                        <v-btn
                          small
                          text
                          color="success"
                          @click="deletePhotoParmanent"
                          >yes</v-btn
                        >
                        <v-btn small text color="red" @click="cancelDelete"
                          >NO</v-btn
                        >
                      </div>
                    </v-col>

                    <!-- <v-col> <v-btn fab><v-icon>mdi-email</v-icon></v-btn> </v-col> -->
                  </v-row>
                </div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="teal">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Images to upload</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>
            <v-btn
              color="orange"
              @click="uploadPhotos"
              :loading="upload_all"
              dark
            >
              <v-icon class="mr-1">mdi-arrow-up-bold-circle-outline</v-icon
              >Upload all
            </v-btn>
          </v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col
                      cols="4"
                      class="py-1"
                      v-for="(item, i) in files"
                      :key="i"
                      :id="'card-' + i"
                    >
                      <v-card>
                        <v-card-text class="py-0">
                          <v-row align="center">
                            <v-col cols="3" class="pb-0 pt-2 px-1">
                              <img :id="'image-' + i" class="selected-image" />
                            </v-col>
                            <v-col cols="5">
                              <h3>{{ getFileName(i) }}</h3>
                              <span>{{ Math.round(item.size / 1024) }} KB</span>
                            </v-col>
                            <v-col cols="4">
                              <v-btn
                                outlined
                                fab
                                small
                                color="red"
                                class="mr-2"
                                @click="removeItemFromUpload(i)"
                              >
                                <v-icon>mdi-close</v-icon>
                              </v-btn>
                              <!-- <v-btn outlined fab small color="teal">
                                <v-icon>mdi-arrow-up</v-icon>
                              </v-btn> -->
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="showPhoho"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="teal">
          <v-btn icon dark @click="showPhoho = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Gallery View</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <galleryView
            :img_url="img_url"
            :pics="photos"
            :onboarding="onboarding"
          />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :multi-line="multiLine" :timeout="timeout">
      {{ snackbar_message }}
    </v-snackbar>
  </v-card>
</template>

<script>
import authStore from "../../store/auth";
import urls from "@/axios/config";
import axios from "axios";
import galleryView from "@/components/commons/PictureGallery";
export default {
  name: "Photos",
  components: { galleryView },
  data: function() {
    return {
      image_loading: true,
      photos: [],
      hide_input: true,
      file_btn: null,
      file_input: null,
      dialog: false,
      files: [],
      upload_all: false,
      img_url: urls.IMGURL,
      transparent: "rgba(255, 255, 255, 0)",
      icons: ["mdi-rewind", "mdi-play", "mdi-fast-forward"],
      itemToDelete: -1,
      snackbar: false,
      multiLine: true,
      timeout: 2000,
      snackbar_message: "Photo deleted successfully !",
      showPhoho: false,
      onboarding: -1,
    };
  },
  methods: {
    getSelectedFiles(e) {
      this.files = e.target.files;
      this.dialog = true;
      this.getImage();
    },
    getImage() {
      for (let i = 0; i < this.files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(this.files[i]);
        reader.onload = async function(e) {
          const image = document.getElementById("image-" + i);
          image.src = await e.target.result;
        };
      }
    },
    getFileName(i) {
      const name = this.files[i].name;
      return name.length > 20
        ? name.substr(0, 12) +
            "..." +
            name.substr(name.length - 6, name.length - 1)
        : name;
    },
    uploadPhotos() {
      this.upload_all = true;
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken(),
        },
      };
      const formData = new FormData();
      this.files.forEach((el) => {
        formData.append("images", el, el.name);
      });

      axios
        .post(urls.URL + "/gallery/", formData, config)
        .then((res) => {
          if (res.data.status) this.getPhotos();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.upload_all = false;
        });
    },
    getPhotos() {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken(),
        },
      };
      axios.get(urls.URL + "/gallery/", config).then((res) => {
        this.dialog = false;
        if (res.data.status) {
          this.photos = res.data.data;
        }
      });
    },
    deletePhoto(index) {
      this.itemToDelete = index;
    },
    deletePhotoParmanent() {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken(),
        },
      };
      axios
        .delete(
          urls.URL + "/gallery/delete/" + this.photos[this.itemToDelete].id,
          config
        )
        .then((res) => {
          if (res.data.status) {
            this.snackbar_message = "Photo deleted successfully.";
            this.photos.splice(this.itemToDelete, 1);
          }
        })
        .catch(() => {
          this.snackbar_message = "Failed to delete Photo.";
        })
        .finally(() => {
          this.itemToDelete = -1;
          this.snackbar = true;
        });
    },
    cancelDelete() {
      this.itemToDelete = -1;
    },
    removeItemFromUpload(index) {
      document.getElementById(`card-${index}`).remove();
      // this.files.splice(index,1);
      delete this.files[index];
    },
    viewPhoto(index) {
      this.onboarding = index;
      this.showPhoho = true;
    },
  },
  created: function() {
    setTimeout(() => {
      this.image_loading = false;
    }, 5000);
    this.getPhotos();
  },
  mounted: function() {
    var file_btn = document.getElementById("file-btn");
    var file_input = document.getElementById("file-input");
    file_btn.addEventListener("click", () => {
      file_input.click();
    });
  },
};
</script>

<style lang="css" scoped>
* {
  font-family: "Roboto", sans-serif;
}
.selected-image {
  width: 100px;
  height: 90px;
  object-fit: cover;
  /* border-radius:50% */
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>
