<template>
  <v-container fluid>
    <v-row class="pa-8 ml-4">
      <div class="heading">Upload Documents</div>
      <v-col cols="12">
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" sm="3">
              <v-select
                v-model="proof_selected"
                :rules="[rules.required]"
                dense
                :items="proof_types"
                outlined
                label="Proof Type"
                color="#2c7873"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3">
              <v-select
                v-model="document_selected"
                :rules="[rules.required]"
                dense
                :items="items"
                outlined
                label="Document Type"
                color="#2c7873"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                placeholder="ID Number"
                v-model="id_number"
                dense
                outlined
                label="ID Number"
                color="#2c7873"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3">
              <v-file-input
                v-model="file_front"
                color="#2c7873"
                label="Document Front Image"
                placeholder="Document Front Image"
                prepend-inner-icon="mdi-camera"
                prepend-icon
                outlined
                dense
                :show-size="1000"
                :rules="[rules.required]"
              >
                <template v-slot:selection="{ text }">
                  <v-chip color="#2c7873" dark label small>{{ text }}</v-chip>
                </template>
              </v-file-input>
            </v-col>
            <v-col cols="12" sm="3">
              <v-file-input
                v-model="file_back"
                color="#2c7873"
                label="Document Back Image"
                placeholder="Document Back Image"
                prepend-inner-icon="mdi-camera"
                prepend-icon
                outlined
                dense
                :show-size="1000"
                :rules="[rules.required]"
              >
                <template v-slot:selection="{ text }">
                  <v-chip color="#2c7873" dark label small>{{ text }}</v-chip>
                </template>
              </v-file-input>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="4" class="py-0">
              <v-btn
                :loading="uploading"
                :disabled="valid"
                color="#0FEF70C6"
                style="color: #fff"
                class="ml-2 mb-4 px-6 documentUpload"
                @click="uploadDocument"
              >
                Upload
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="8">
              <v-alert
                v-if="alert.show"
                dense
                border="left"
                :type="alert.type"
                dismissible
                >{{ alert.message }}</v-alert
              >
            </v-col>
          </v-row>
        </v-form>
        <v-divider />
      </v-col>

      <v-col cols="12" class="mt-5">
        <v-simple-table class="table-border">
          <template v-slot:default>
            <thead style="background: #383D43;border-radius: 10px">
              <tr>
                <th class="text-left white--text">Proof Type</th>
                <th class="text-left white--text">Document Type</th>
                <th class="text-center white--text">Uploaded On</th>
                <th class="text-center white--text">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td class="text-left">{{ item.name }}</td>
                <td class="text-left">{{ item.calories }}</td>
                <td class="text-center">{{ item.calories }}</td>
                <td class="text-center">
                  <!-- <v-btn small color="orange" dark text>download</v-btn> -->
                  <v-btn small color="red" dark text>remove</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import authStore from "../../store/auth";
import urls from "@/axios/config";
import axios from "axios";
export default {
  name: "Document",
  data: () => ({
    alert: { show: false, type: "", message: "" },
    valid: true,
    items: ["Aadhaar Card", "Voter ID", "PAN Card", "School/College ID Card"],
    uploading: false,
    proof_types: ["ID Proof", "Address Proof"],
    rules: { required: (value) => !!value || "Required." },
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
      },
    ],
    proof_selected: "",
    document_selected: "",
    id_number: "",
    file_front: null,
    file_back: null,
  }),
  methods: {
    uploadDocument() {
      let formData = new FormData();
      formData.append("id_type", this.proof_selected);
      formData.append("id_name", this.document_selected);
      formData.append("id_number", this.id_number);
      formData.append("id_proof_photo_1	", this.file_front);
      formData.append("id_proof_photo_2", this.file_back);
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken(),
        },
      };
      this.uploading = true;
      axios
        .post(urls.URL + "/host/uploadproof/", formData, config)
        .then((res) => {
          this.uploading = false;
          if (res.status) {
            this.proof_selected = "";
            this.document_selected = "";
            this.id_number = "";
            this.file_front = null;
            this.file_back = null;
            this.showAlert("success", "Document submitted successfully");
          } else {
            this.showAlert(
              "error",
              "Failed to upload document. Try after sometime"
            );
          }
          console.log(res);
        })
        .catch(() => {
          this.uploading = false;
          this.showAlert(
            "error",
            "Failed to upload document. Try after sometime"
          );
        });
    },
    showAlert(type, message) {
      this.alert.type = type;
      this.alert.message = message;
      this.alert.show = true;
      setTimeout(() => {
        this.alert.show = false;
        this.alert.type = "";
        this.alert.message = "";
      }, 8000);
    },
  },
  created: function() {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  },
};
</script>

<style scoped>
.table-border {
  border: 1px solid #323232;
}

* {
  font-family: "Roboto", sans-serif;
}
.heading {
  font-size: 1.5rem;
  font-weight: bold;
}

.documentUpload:hover {
  background-color: rgb(44, 120, 115) !important;
  color: #000 !important;
}
</style>
