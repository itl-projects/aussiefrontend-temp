<template>
  <v-form ref="form" v-on:submit.prevent="add" v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" v-if="success">
          <v-alert border="left" colored-border type="success" elevation="2">{{ message }}</v-alert>
        </v-col>
        <v-col cols="12" sm="12" v-if="warning">
          <v-alert border="left" colored-border type="warning" elevation="2">{{ message }}</v-alert>
        </v-col>
        <v-col cols="12" sm="12" v-if="error">
          <v-alert border="left" colored-border type="error" elevation="2">{{ message }}</v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="2">
          <picture-input
            ref="pictureInput"
            @change="onChanged"
            @remove="onRemoved"
            :width="200"
            :removable="true"
            removeButtonClass="ui red button"
            :height="200"
            accept="image/jpeg, image/png, image/gif"
            buttonClass="ui button primary"
            :customStrings="{
                        upload: '<h1>Upload it!</h1>',
                        drag: 'Drag and drop your pet image here'}"
          ></picture-input>
        </v-col>
        <v-col cols="12" sm="10">
          <v-row>
            <v-col cols="6" sm="4">
              <v-select
                v-on:change="changePetType"
                v-model="petTypeSelected"
                :items="petType"
                label="select pet type"
                dense
                outlined
                :rules="requiredRule"
                required
                hide-details="auto"
              ></v-select>
            </v-col>
            <v-col cols="6" sm="4">
              <v-select
                :items="petSubType"
                label="select pet sub type"
                dense
                outlined
                :rules="requiredRule"
                required
                hide-details="auto"
              ></v-select>
            </v-col>
            <v-col cols="6" sm="4">
              <!-- <v-select v-model="breedSelected" :items="breedTypes" label="select breed type" dense outlined></v-select> -->
              <v-autocomplete
                v-model="breedSelected"
                :items="breedTypes"
                label="Breed type ?"
                :loading="loading"
                outlined
                dense
                :rules="requiredRule"
                hide-details="auto"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="4">
              <v-text-field
                v-model="petName"
                :rules="nameRules"
                label="Pet Name"
                required
                outlined
                dense
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="6" md="4">
              <v-text-field
                :rules="requiredRule"
                v-model="petAge"
                label="Pet Age"
                required
                outlined
                dense
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="4">
              <v-text-field
                :rules="requiredRule"
                v-model="petWeight"
                label="Pet weight"
                required
                outlined
                dense
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="4" >
              <v-select
                v-model="petGenderSelected"
                :items="petGenders"
                label="pet gender"
                dense
                required
                outlined
                :rules="requiredRule"
                hide-details="auto"
              ></v-select>
            </v-col>
           <v-col cols="12" sm="8" >
             <v-row>
                <v-switch v-model="desexed" class="ma-2" label="Desexed"></v-switch>
            <v-switch v-model="microchipped" class="ma-2" label="Microchipped"></v-switch>
            <v-switch v-model="isSocial" class="ma-2" label="Is Social"></v-switch>
            <v-switch v-model="isTrained" class="ma-2" label="Is Trained"></v-switch>
             </v-row>
           </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4" v-if="isSocial">
              <v-textarea
                v-model="instructionSocial"
                outlined
                label="Social Intructions"
                rows="3"
                counter="250"
                hide-details="auto"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="4" v-if="isTrained">
              <v-textarea
                v-model="instructionTraining"
                outlined
                label="Training Intructions"
                rows="3"
                counter="250"
                hide-details="auto"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="4">
              <v-textarea
                v-model="emergencyInstruction"
                outlined
                label="Emergency Intructions"
                :rules="requiredRule"
                required
                rows="3"
                counter="250"
                hide-details="auto"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
           
            <v-col cols="12" sm="4">
              <v-textarea
                v-model="noteForHost"
                outlined
                label="Notes for host"
                :rules="requiredRule"
                required
                rows="3"
                counter="250"
                hide-details="auto"
              ></v-textarea>
            </v-col>
             <v-col cols="12" sm="4">
              <v-textarea
                v-model="veterinaryDetails"
                outlined
                rows="3"
                counter="250"
                hide-details="auto"
              >
                <template v-slot:label>
                <div>
                  Veterinary Details <small>(optional)</small>
                </div>
              </template>
              </v-textarea>
            </v-col>
            <v-col cols="12" sm="4">
              <v-textarea
                v-model="additionalInformation"
                outlined
                label=""
                rows="3"
                counter="250"
                hide-details="auto"
              ><template v-slot:label>
                <div>
                  Any Aditional Informations <small>(optional)</small>
                </div>
              </template>
              
              </v-textarea>
            </v-col>
          </v-row>
          <v-btn type="submit" color="success" :disabled="!valid">Submit</v-btn>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" :vertical="vertical">
        {{ snackbarText }}
        <template>
          <v-btn color="yellow" text>Okay</v-btn>
        </template>
      </v-snackbar>
      <v-overlay :value="formSubmitting">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    </v-container>
  </v-form>
  
</template>
<script>
import axios from "axios";
import urls from "@/axios/config";
import PictureInput from "vue-picture-input";
import authStore from "../../store/auth";
export default {
  name: "PetAddForm",
  components: { PictureInput },
  data() {
    return {
      valid: true,
      loading:false,
      success: false,
      error: false,
      warning: false,
      formSubmitting:false,
      petName: "",
      petAge: "",
      petWeight: "",
      nameRules: [v => !!v || "Pet Name is required"],
      requiredRule: [v => !!v || "field is required"],
      fileRules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ],
      petType: [],
      petSubType: [],
      petTypeSelected: "",
      breedTypes: [],
      breedSelected: "",
      petTypes: [],
      petGenders: ["Male", "Female", "Other"],
      petGenderSelected: "",
      desexed: false,
      microchipped: false,
      isSocial: false,
      isTrained: false,
      instructionSocial: "",
      instructionTraining: "",
      emergencyInstruction: "",
      veterinaryDetails: "",
      noteForHost: "",
      additionalInformation: "",
      snackbar: false,
      snackbarText: "",
      vertical: true,
      petImage: null,
      message: "",
      formErrors:{}
    };
  },
  methods: {
    add() {
      if (!this.valid) {
        this.message = "Please fill all the required field";
        this.warning = true;
        setTimeout(() => {
          this.warning = false;
        }, 2000);
        return;
      }
      this.formSubmitting = true;
      const data = {
        petType: this.petTypeSelected,
        petbreed: this.breedSelected,
        petName: this.petName,
        petWeight: this.petWeight,
        petAge: parseInt(this.petAge),
        petGender: this.petGenderSelected,
        desexed: this.desexed,
        microchipped: this.microchipped,
        isSocial: this.isSocial,
        instructionSocial: this.instructionSocial,
        isTrained: this.isTrained,
        instructionTraining: this.instructionTraining,
        emergencyInstruction: this.emergencyInstruction,
        veterinaryDetails: this.veterinaryDetails,
        noteForHost: this.noteForHost,
        additionalInformation: this.additionalInformation
      };
       let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      axios
        .post(urls.URL+"/pet/register/", data, config)
        .then(res => {
          this.formSubmitting = false;
          if (!res.data.status) {
            for(let error in res.data.errors){
              this.message = this.message
              +error+" field is required !\n";
            }
            this.error = true;
            setTimeout(() => {
              this.error = false;
            }, 5000);
          } else {
            this.$refs.form.reset();
            this.message = "Success! Your pet has been saved successfully.";
            this.success = true;
            setTimeout(() => {
              this.success = false;
            }, 5000);
            authStore.setPetCount(parseInt(authStore.getPetCount()) + 1);
          }

          // console.log(res);
        })
        .catch(e => {
          this.message = "Sorry! Failed to add your pet.";
          this.error = true;
          setTimeout(() => {
              this.error = false;
            }, 5000);
            console.log(e);
        });
    },
    changePetType(a) {
      this.loading = true;
      this.petSubType = [];
      this.petTypes.forEach(el => {
        if (el.type == a) {
          this.petSubType.push(el.subType);
        }
      });
      axios
        .get(urls.URL+"/pet/breed/?type=" + a)
        .then(res => {
          this.loading = false;
          this.breedTypes = [];
          res.data.data.forEach(element => {
            this.breedTypes.push(element.breed);
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
    onChanged() {
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file;
      } else {
        console.log("Old browser. No support for Filereader API");
      }
    },
    onRemoved() {
      this.image = "";
    },
    getPetTypes() {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      axios
        .get(urls.URL+"/pet/type/", config)
        .then(res => {
          this.petTypes = res.data.data;
          res.data.data.forEach(element => {
            if (!this.petType.includes(element.type)) {
              this.petType.push(element.type);
            }
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created: function() {
    // `this` points to the vm instance
    // console.log("a is: " + this.a);
    this.getPetTypes();
  }
};
</script>
<style scoped>
.primary,
.red {
  padding: 5px 8px;
  color: #fff;
}
</style>