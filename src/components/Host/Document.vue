<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
          <v-form ref="form" v-model="valid">
        <v-row>
          <v-col cols="12" sm="3">
            <v-select v-model="proof_selected" :rules="[rules.required]" hide-details dense :items="proof_types" outlined label="Proof Type" color="#2c7873"></v-select>
          </v-col>
          <v-col cols="12" sm="3">
            <v-select v-model="document_selected" :rules="[rules.required]" hide-details dense :items="items" outlined label="Document Type" color="#2c7873"></v-select>
          </v-col>
          <v-col cols="12" sm="3">
            <v-file-input
              v-model="file"
              color="#2c7873"
              label="Document File"
              placeholder="Document File"
              prepend-icon="mdi-paperclip"
              hide-details
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
           <v-col cols="12" >
        <v-btn :loading="uploading" :disabled="!valid" color="#2c7873" class="ml-2 mb-4 px-6 white--text" @click="uploadDocument">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
        </v-row>
          </v-form>
          <v-divider/>
      </v-col>

      <v-col cols="12" class="mt-5">
          
          <v-simple-table class="table-border">
    <template v-slot:default>
      <thead style="background: #2c7873;">
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
              <v-btn small color="orange" dark text>download</v-btn>
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
export default {
    name:"Document",
  data: () => ({
      valid:true,
    items: ["Aadhaar Card", "Voter ID", "PAN Card", "School/College ID Card"],
    uploading: false,
    proof_types:['ID Proof','Address Proof'],
    rules:{required: value => !!value || 'Required.'},
    desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
    ],
    proof_selected:"",
    document_selected:"",
    file:null,
  }),
  methods:{
      uploadDocument(){
          let formData = new FormData();
          formData.append('proof_type',this.proof_selected);
          formData.append('document_type',this.document_selected);
          formData.append('document_file',this.file);
         
          console.log(formData);
      }
  },
  created: function(){
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
};
</script>

<style scoped>
.table-border{
    border: 1px solid #323232;
}
</style>