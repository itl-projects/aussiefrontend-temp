<template>
  <div>
    <NavBar />
    <v-container fluid style="position:relative">
      <v-row>
        <v-col cols="12" sm="8">
          <v-row>
            <v-col cols="12" sm="4" class="text-center">
          <v-avatar size="200px" color="#989898" v-if="host_additional_data.avatar">
            <v-img
              lazy-src="@/assets/images/icon-people-circle.svg"
              :src="img_url.slice(0,img_url.length-1) + host_additional_data.avatar"
            />
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="8">
          <h1
            style="font-weight: 500; color: #2c7873;"
          >{{host_details.first_name}} {{host_details.last_name}}</h1>
          <div class="flex mt-2 mb-2">
            <v-icon>mdi-acc-countircle</v-icon>
            <v-icon>mdi-acc-countircle</v-icon>
            <v-icon>mdi-acc-countircle</v-icon>
            <v-icon>mdi-acc-countircle</v-icon>
          </div>
          <v-label class="heading" style="font-size: 1.4rem;">Reliable and VERY caring dog sitter.</v-label>
          <div class="flex mt-2">
            <v-btn outlined color="#2c7873" x-small>7 Repeat guest</v-btn>
            <v-rating
              style="display: inline-block;"
              v-model="rating"
              color="warning"
              half-increments
              dense
              small
              size="18"
            ></v-rating>
            <v-btn
              small
              text
              color="#2c7873"
              style="letter-spacing: 0; text-transform: lowercase;"
            >28 reviews</v-btn>
          </div>
          <div class="flex">
            <v-chip small class="mt-2">respond within a day</v-chip>
            <v-chip class="ml-2 mt-2" small>92% response rate</v-chip>
          </div>
        </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="px-sm-10 about-box ml-sm-1 mt-4">
              <h3>About Host: </h3>
              <span> {{ host_additional_data.hostbio }} </span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card>
            <v-card-title>
              <v-row class="py-0">
                <v-col cols="6" class="py-0">
                  <h2
                    style="font-weight: 200;letter-spacing: -1px;font-variant: all-petite-caps;"
                  >{{ serviceSelected.title }}</h2>
                </v-col>
                <v-col cols="6" class="py-0 text-end">
                  <h3 style="font-weight:400;color: #2c7873; display: inline-block;">${{serviceSelected.price}}</h3>
                  <span style="font-size: 0.7rem;">/night</span>
                </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid">
                  <v-label>I'm looking for</v-label>
                  <v-select :rules="[rules.required]" return-object v-model="serviceSelected" item-text="title" :items="serviceType" outlined dense @change="selectChange"></v-select>
                  <v-spacer></v-spacer>
                  <v-label>My Pet(s)</v-label>
                  <v-menu v-model="menu" :close-on-content-click="closeOnContext" class="pa-0 ma-0">
                    <template v-slot:activator="{ on, attrs }">
                      <v-select
                        v-bind="attrs"
                        v-on="on"
                        :label="petSelected"
                        :error-messages="petSelectErrors"
                        :rules="[rules.required]"
                        outlined
                        dense
                        no-data-text
                        hide-no-data
                        single-line
                      ></v-select>
                    </template>
                    <v-list class="pa-0 ma-0">
                      <v-list-item class="pa-0">
                        <v-list-item-content class="py-0">
                          <v-row style="width: 300px;">
                            <v-col
                              cols="12"
                              v-for="(item, i) in petTypes"
                              :key="i"
                              :class="item.class"
                              class="py-1 pr-4"
                            >
                              <v-row class="py-0" align="center">
                                <v-col cols="7" class="pl-5 py-0">{{ item.title }}</v-col>
                                <v-col cols="5" class="py-1 text-end">
                                  <v-btn x-small icon @click="decrement(i)">
                                    <v-icon>mdi-minus-circle-outline</v-icon>
                                  </v-btn>
                                  {{ item.count }}
                                  <v-btn x-small icon @click="increment(i)">
                                    <v-icon>mdi-plus-circle-outline</v-icon>
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item-action class="apply_btn_box">
                        <v-btn outlined @click="closeMenu" color="white">Apply</v-btn>
                      </v-list-item-action>
                    </v-list>
                  </v-menu>
                  
                  <v-spacer />
                  <v-row v-if="dayService">
                    <v-col cols="12" class="pb-0">
                      <v-label>Select Date</v-label>
                    </v-col>
                    <v-col cols="12">
                      <v-dialog
                        ref="start_dialog"
                        v-model="start_modal"
                        :return-value.sync="start_date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="start_date"
                            label="Select Date"
                            :error-messages="errorStartDate"
                            append-icon="mdi-calendar"
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="start_date" scrollable  color="#2c7873" :min="min_date" multiple>
                          <v-spacer></v-spacer>
                          <v-btn text color="#2c7873" @click="start_modal = false">Cancel</v-btn>
                          <v-btn text color="#2c7873" @click="$refs.start_dialog.save(start_date)">OK</v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                   
                  </v-row>
                  <v-row v-else>
                    <v-col cols="12" class="pb-0">
                      <v-label>For These Days</v-label>
                    </v-col>
                    <v-col cols="6">
                      <v-dialog
                        ref="start_dialog"
                        v-model="start_modal"
                        :return-value.sync="start_date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="start_date"
                            :rules="[rules.required]"
                            label="Drop Off"
                            :error-messages="errorStartDate"
                            append-icon="mdi-calendar"
                            outlined
                            dense
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="start_date" scrollable  color="#2c7873" :min="min_date">
                          <v-spacer></v-spacer>
                          <v-btn text color="#2c7873" @click="start_modal = false">Cancel</v-btn>
                          <v-btn text color="#2c7873" @click="$refs.start_dialog.save(start_date)">OK</v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col cols="6">
                      <v-dialog
                        ref="pickup_dialog"
                        v-model="pickup_modal"
                        :return-value.sync="pickup_date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="pickup_date"
                            :rules="[rules.required]"
                            :error-messages="errorEndDate"
                            label="Pick up"
                            append-icon="mdi-calendar"
                            outlined
                            dense
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="pickup_date" scrollable color="#2c7873" :min="min_date">
                          <v-spacer></v-spacer>
                          <v-btn text color="#2c7873" @click="pickup_modal = false">Cancel</v-btn>
                          <v-btn text color="#2c7873" @click="$refs.pickup_dialog.save(pickup_date)">OK</v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>

                  <v-spacer />
                  <v-btn
                    :disabled="valid"
                    color="#2c7873"
                    class="mt-8 white--text"
                    block
                  >Contact Host</v-btn>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card width="100%">
            <v-tabs v-model="tab" background-color="teal" dark fixed-tabs center-active show-arrows>
              <v-tabs-slider color="orange"></v-tabs-slider>
              <v-tab key="services_rates">Services and Rates</v-tab>
              <v-tab key="pet-accept">Pet Accept</v-tab>
              
              <v-tab key="photos">Photos</v-tab>
              <v-tab key="rating">Rating and Review</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
             
              <v-tab-item key="services_rates">
                <v-card flat>
                  <v-card-text>
                    <!-- <v-container fluid> -->
                      <h2 class="top-heading">Services</h2>
                       <!-- <v-divider/> -->
                    <v-row>
                      <v-col cols="12" sm="6" class="py-0">
                        <v-row>
                          <v-col cols="12" class="services-box">
                            <h3>Overnight pet services</h3>
                            <!-- <v-divider /> -->
                            <v-row>
                              <v-col cols="12" sm="6">
                                <v-row align="center">
                                  <v-col cols="2">
                                    <v-avatar color="white">
                                      <v-img
                                        src="@/assets/images/Frame.svg"
                                        max-width="52px"
                                        max-height="52px"
                                        contain
                                      ></v-img>
                                    </v-avatar>
                                  </v-col>
                                  <v-col cols="5">
                                    <v-label>Pet Hosting</v-label>
                                    <br />
                                    <span class="grey--text">At Sitter's Home</span>
                                  </v-col>
                                  <v-divider vertical />
                                  <v-col cols="4">
                                    <v-label v-if="pet_hosting.provided">
                                      $ {{pet_hosting.price}}
                                      <span class="grey--text">/ night</span>
                                    </v-label>
                                    <v-label v-else>
                                     not offered
                                    </v-label>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12" sm="6">
                                <v-row align="center">
                                  <v-col cols="2">
                                    <v-avatar color="white">
                                      <v-img
                                        src="@/assets/images/tab-2.svg"
                                        max-width="52px"
                                        max-height="52px"
                                        contain
                                      ></v-img>
                                    </v-avatar>
                                  </v-col>
                                  <v-col cols="5">
                                    <v-label>Pet Sitting</v-label>
                                    <br />
                                    <span class="grey--text">At Pet's Home</span>
                                  </v-col>
                                  <v-divider vertical />
                                  <v-col cols="4">
                                     <v-label v-if="pet_sitting.provided">
                                      $ {{pet_sitting.price}}
                                      <span class="grey--text">/ night</span>
                                    </v-label>
                                    <v-label v-else>
                                     not offered
                                    </v-label>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col cols="12" class="services-box">
                            <h3>Transport</h3>
                            <!-- <v-divider /> -->
                            <v-row>
                              <v-col cols="12" sm="6">
                                <v-row align="center">
                                  <v-col cols="2">
                                    <v-avatar color="white">
                                      <v-icon x-large color="rgb(63, 224, 126)">mdi-car-pickup</v-icon>
                                    </v-avatar>
                                  </v-col>
                                  <v-col cols="5">
                                    <v-label>Pick Up - Drop Off</v-label>
                                    <br />
                                  </v-col>
                                  <v-divider vertical />
                                  <v-col cols="4">
                                    <v-label v-if="pick_drop_service.provided">
                                      $ {{pick_drop_service.price}}
                                      <span class="grey--text">/ night</span>
                                    </v-label>
                                    <v-label v-else>
                                     not offered
                                    </v-label>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <!-- <v-col cols="12" sm="6">
                                <v-row align="center">
                                  <v-col cols="2">
                                    <v-avatar color="white">
                                      <v-icon x-large color="rgb(63, 224, 126)">mdi-car-hatchback</v-icon>
                                    </v-avatar>
                                  </v-col>
                                  <v-col cols="5">
                                    <v-label>Pet Sitting</v-label>
                                    <br />
                                    <span class="grey--text">At Pet's Home</span>
                                  </v-col>
                                  <v-divider vertical />
                                  <v-col cols="4">
                                    <v-label>
                                      $33
                                      <span class="grey--text">/ night</span>
                                    </v-label>
                                  </v-col>
                                </v-row>
                              </v-col> -->
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="6" class="services-box">
                        <h3>Daytime pet services</h3>
                        <!-- <v-divider /> -->
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-row align="center">
                              <v-col cols="2">
                                <v-avatar color="white">
                                  <v-img
                                    src="@/assets/images/tab-3.svg"
                                    max-width="52px"
                                    max-height="52px"
                                    contain
                                  ></v-img>
                                </v-avatar>
                              </v-col>
                              <v-col cols="5">
                                <v-label>Pet Day Care</v-label>
                              </v-col>
                              <v-divider vertical />
                              <v-col cols="4">
                               <v-label v-if="pet_day_care.provided">
                                      $ {{pet_day_care.price}}
                                      <span class="grey--text">/ night</span>
                                    </v-label>
                                    <v-label v-else>
                                     not offered
                                    </v-label>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-row align="center">
                              <v-col cols="2">
                                <v-avatar color="white">
                                  <v-img
                                    src="@/assets/images/tab-4.svg"
                                    max-width="52px"
                                    max-height="52px"
                                    contain
                                  ></v-img>
                                </v-avatar>
                              </v-col>
                              <v-col cols="5">
                                <v-label>House Visiting</v-label>
                              </v-col>
                              <v-divider vertical />
                              <v-col cols="4">
                                <v-label v-if="house_visits.provided">
                                      $ {{house_visits.price}}
                                      <span class="grey--text">/ night</span>
                                    </v-label>
                                    <v-label v-else>
                                     not offered
                                    </v-label>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-row align="center">
                              <v-col cols="2">
                                <v-avatar color="white">
                                  <v-img
                                    src="@/assets/images/tab-5.svg"
                                    max-width="52px"
                                    max-height="52px"
                                    contain
                                  ></v-img>
                                </v-avatar>
                              </v-col>
                              <v-col cols="5">
                                <v-label>
                                  Exercise &
                                  <br />walkies services
                                </v-label>
                              </v-col>
                              <v-divider vertical />
                              <v-col cols="4">
                                <v-label v-if="excercise_walk_service.provided">
                                      $ {{excercise_walk_service.price}}
                                      <span class="grey--text">/ night</span>
                                    </v-label>
                                    <v-label v-else>
                                     not offered
                                    </v-label>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-row align="center">
                              <v-col cols="2">
                                <v-avatar color="white">
                                  <v-img
                                    src="@/assets/images/tab-6.svg"
                                    max-width="52px"
                                    max-height="52px"
                                    contain
                                  ></v-img>
                                </v-avatar>
                              </v-col>
                              <v-col cols="5">
                                <v-label>Pet Grooming</v-label>
                              </v-col>
                              <v-divider vertical />
                              <v-col cols="4">
                                <v-label v-if="pet_grooming.provided">
                                      $ {{pet_grooming.price}}
                                      <span class="grey--text">/ night</span>
                                    </v-label>
                                    <v-label v-else>
                                     not offered
                                    </v-label>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-row align="center">
                              <v-col cols="2">
                                <v-avatar color="white">
                                  <v-img
                                    src="@/assets/images/tab-7.svg"
                                    max-width="52px"
                                    max-height="52px"
                                    contain
                                  ></v-img>
                                </v-avatar>
                              </v-col>
                              <v-col cols="5">
                                <v-label>
                                  Pet Training
                                  <br />services
                                </v-label>
                              </v-col>
                              <v-divider vertical />
                              <v-col cols="4">
                                <v-label v-if="pet_training.provided">
                                      $ {{pet_training.price}}
                                      <span class="grey--text">/ night</span>
                                    </v-label>
                                    <v-label v-else>
                                     not offered
                                    </v-label>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-divider/>
                    <v-row>
                      <v-col cols="12" sm="12">
                        <h2 class="top-heading">Policy</h2>
                         <v-row class="ml-6">
                        <v-col cols="12">
                          <v-badge :icon="cancellation_policy.provided ? 'mdi-check' : 'mdi-close'" :color="cancellation_policy.provided ? 'green' : 'grey'"  left offset-y="15" offset-x="-5">
                            <b>Cancellation: {{cancellation_policy.type}}</b>
                          </v-badge>
                          <p
                            class="mb-0"
                          >A full refund will be offered to Pet Owners if they cancel up until 7 days before the booking at 12 noon. After which Pet Owners will be charged 50% of the total booking value.</p>
                        </v-col>
                        <v-col cols="12">
                          <v-badge
                            :icon="long_term_bookings.provided  ? 'mdi-check' : 'mdi-close'" :color="long_term_bookings.provided  ? 'green' : 'grey'" 
                            left
                            offset-y="15"
                            offset-x="-5"
                          >Accepts long-term bookings</v-badge>
                        </v-col>
                        <v-col cols="12">
                          <v-badge
                            :icon="last_min_bookings.provided  ? 'mdi-check' : 'mdi-close'" :color="last_min_bookings.provided  ? 'green' : 'grey'" 
                            left
                            offset-y="15"
                            offset-x="-5"
                          >Accepts last-minute bookings</v-badge>
                        </v-col>
                      </v-row>
                      </v-col>
                    </v-row>
                    <!-- </v-container> -->
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item key="pet-accept">
                <v-card flat>
                  <v-card-text class="px-10" style="font-size: 1.2rem;white-space: pre-line;">
                    <v-row>
                      <v-col class="text-center mb-2" cols="2">
                        <v-badge :icon="pet_types.includes('Dog Small (0-10kg)') ? 'mdi-check' : 'mdi-close'" :color="pet_types.includes('Dog Small (0-10kg)') ? 'green' : 'grey'">
                          <v-icon large>mdi-donkey</v-icon>
                        </v-badge>
                        <br />
                        <v-label>Small Dog</v-label>
                      </v-col>
                      <v-col class="text-center mb-2" cols="2" >
                        <v-badge :icon="pet_types.includes('Medium Dog(11-20kg)') ? 'mdi-check' : 'mdi-close'" :color="pet_types.includes('Medium Dog(11-20kg)') ? 'green' : 'grey'" >
                          <v-icon large>mdi-dog</v-icon>
                        </v-badge>
                        <br />
                        <v-label>Medium Dog</v-label>
                      </v-col>
                      <v-col class="text-center mb-2" cols="2">
                        <v-badge :icon="pet_types.includes('Large Dog(21-40kg)') ? 'mdi-check' : 'mdi-close'" :color="pet_types.includes('Large Dog(21-40kg)') ? 'green' : 'grey'">
                          <v-icon large>mdi-dog-side</v-icon>
                        </v-badge>
                        <br />
                        <v-label>Large Dog</v-label>
                      </v-col>
                      <v-col class="text-center mb-2" cols="2">
                        <v-badge :icon="pet_types.includes('Gaint Dog(41+kg)') ? 'mdi-check' : 'mdi-close'" :color="pet_types.includes('Gaint Dog(41+kg)') ? 'green' : 'grey'">
                          <v-icon large>mdi-dog-service</v-icon>
                        </v-badge>
                        <br />
                        <v-label>Gaint Dog</v-label>
                      </v-col>
                      <v-col class="text-center mb-2" cols="2">
                        <v-badge :icon="pet_types.includes('Puppy') ? 'mdi-check' : 'mdi-close'" :color="pet_types.includes('Puppy') ? 'green' : 'grey'">
                          <v-icon large>mdi-paw</v-icon>
                        </v-badge>
                        <br />
                        <v-label>Puppy</v-label>
                      </v-col>
                      <v-col class="text-center mb-2" cols="2">
                        <v-badge :icon="pet_types.includes('Cats') ? 'mdi-check' : 'mdi-close'" :color="pet_types.includes('Cats') ? 'green' : 'grey'">
                          <v-icon large>mdi-cat</v-icon>
                        </v-badge>
                        <br />
                        <v-label>Cats</v-label>
                      </v-col>
                      <v-col class="text-center mb-2" cols="2">
                        <v-badge :icon="pet_types.includes('Birds') ? 'mdi-check' : 'mdi-close'" :color="pet_types.includes('Birds') ? 'green' : 'grey'">
                          <v-icon large>mdi-owl</v-icon>
                        </v-badge>
                        <br />
                        <v-label>Birds</v-label>
                      </v-col>
                      <v-col class="text-center mb-2" cols="2">
                        <v-badge :icon="pet_types.includes('Rabbit / Guinea Pig') ? 'mdi-check' : 'mdi-close'" :color="pet_types.includes('Rabbit / Guinea Pig') ? 'green' : 'grey'">
                          <v-icon large>mdi-rabbit</v-icon>
                          <v-icon large>mdi-pig</v-icon>
                        </v-badge>
                        <br />
                        <v-label>Rabbit/Guinea Pig</v-label>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              
              <!-- <v-tab-item key="policy">
                <v-card flat>
                  <v-card-text>
                    <v-container fluid class="px-6">
                     
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item> -->
              <v-tab-item key="photos">
                <v-card flat>
                  <v-card-text>
                    <v-container fluid>
                      <v-row>
                        <v-col v-for="(item,i) in host_photos" :key="i" cols="12" md="2">
                          <v-card elevation="4">
                            <v-img
                              :src="img_url + item.image_path"
                              :lazy-src="img_url + item.image_path"
                              aspect-ratio="1"
                              style="cursor: pointer;"
                              @click="showDialog(i)"
                            ></v-img>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item key="rating">
                <v-card flat>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-container class="pt-5">
                        <v-label class="mt-4">Ratings</v-label>
                        <v-card class="mt-6">
                          <v-row>
                            <v-col cols="5" sm="4" class="py-0">
                              <span class="reading-header">DogHeads</span>
                            </v-col>
                            <v-col cols="5" sm="6" class="py-0 pl-0 text-center">
                              <v-rating
                                v-model="dog_rating"
                                half-increments
                                style="line-height: 3rem;"
                                half-icon
                                readonly
                                dense
                              >
                                <template v-slot:item="props">
                                  <v-icon
                                    :color="props.isFilled ? 'orange' : 'grey lighten-1'"
                                  >mdi-dog</v-icon>
                                </template>
                              </v-rating>
                            </v-col>
                            <v-col cols="2" class="py-0">
                              <span class="rating-count">{{dog_rating}}</span>
                            </v-col>
                          </v-row>
                        </v-card>
                        <v-card class="mt-2">
                          <v-row>
                            <v-col cols="5" sm="4" class="py-0">
                              <span class="reading-header">PuppyHeads</span>
                            </v-col>
                            <v-col cols="5" sm="6" class="py-0 pl-0 text-center">
                              <v-rating
                                v-model="puppy_rating"
                                half-increments
                                style="line-height: 3rem;"
                                half-icon
                                readonly
                                dense
                              >
                                <template v-slot:item="props">
                                  <v-icon
                                    :color="props.isFilled ? 'orange' : 'grey lighten-1'"
                                  >mdi-dog</v-icon>
                                </template>
                              </v-rating>
                            </v-col>
                            <v-col cols="2" class="py-0">
                              <span class="rating-count">{{puppy_rating}}</span>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-container>
                    </v-col>
                    <v-divider vertical class="my-4" />
                    <v-col cols="12" sm="7">
                      <v-list three-line>
                        <template v-for="(item, index) in items">
                          <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>
                          <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
                          <v-list-item v-else :key="item.title">
                            <v-list-item-avatar>
                              <v-img :src="item.avatar"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title v-html="item.title"></v-list-item-title>
                              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                              <v-list-item-content class="py-0">
                                <v-row class="pl-2 mt-2">
                                  <v-rating
                                    dense
                                    readonly
                                    v-model="item.rating"
                                    class="ml-0 pl-0 py-0"
                                    half-increments
                                    small
                                    color="orange"
                                  ></v-rating>
                                  <span class="review-rating-count">({{item.rating}})</span>
                                </v-row>
                              </v-list-item-content>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
        <v-overlay :value="overlay" :opacity="opacity" color="white" :absolute="true" >
      <v-progress-circular indeterminate size="64" color="#2c7873"></v-progress-circular>
    </v-overlay>
    </v-container>
    <Footer />
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="#2c7873" flat style="border-radius:0" dense>
          <v-toolbar-title>Host Pics</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <galleryView :img_url="img_url" :pics="host_photos" :onboarding.sync="onboarding" />
        </v-card-text>
      </v-card>
    </v-dialog>
  
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import galleryView from "@/components/commons/PictureGallery";
import * as axios from "axios";
import urls from "@/axios/config";
import router from '../router';

export default {
  name: "HostDetailPage",
  components: {
    NavBar,
    Footer,
    galleryView
  },
  data() {
    return {
      host_id:null,
      city:null,
      valid: true,
      dialog: false,
      closeOnContext: false,
      menu: false,
      tab: null,
      rating: 3,
      serviceSelected: "",
      serviceType: [
        {img:"mdi-dog",title:"Pet Hosting", type:1,price:0},
        {img:"mdi-dog",title:"Pet Sitting", type:1,price:0},
        {img:"mdi-dog",title:"Pet Day Care", type:2,price:0},
        {img:"mdi-dog",title:"House Visiting", type:2,price:0},
        {img:"mdi-dog",title:"Dog Walking", type:2,price:0},         
        {img:"mdi-dog",title:"Dog Grooming", type:2,price:0},
        {img:"mdi-dog",title:"Pet Training", type:2,price:0},
      ],
      petTypes: [],
      petSelected: "Choose Pet(s)",
      host_details: {},
      host_photos: [],
      host_additional_data: {},
      onboarding: 0,
      img_url: urls.IMGURL,
      dog_rating: 4.5,
      puppy_rating: 3.5,
      overlay: false,
      opacity: 1,
      items: [
        { header: "Reviews" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle:
            "<span class='text--#2c7873'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
          rating: 4.5
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--#2c7873'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
          rating: 3.5
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            "<span class='text--#2c7873'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
          rating: 2.2
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          subtitle:
            "<span class='text--#2c7873'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
          rating: 1.2
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          subtitle:
            "<span class='text--#2c7873'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
          rating: 4.5
        }
      ],
      start_modal:false,
      pickup_modal:false,
      start_date: null,
      pickup_date: null,
      isDayHosting: false,
      min_date:new Date().toISOString().substr(0, 10),
      cancellation_policy:{provided:false,type:""},
      excercise_walk_service:{provided:false,price:0},
      house_visits:{provided:false,price:0},
      last_min_bookings:{provided:false,price:0},
      long_term_bookings:{provided:false,price:0},
      pet_day_care:{provided:false,price:0},
      pet_grooming:{provided:false,price:0},
      pet_hosting:{provided:false,price:0},
      pet_sitting:{provided:false,price:0},
      pet_training:{provided:false,price:0},
      pick_drop_service:{provided:false,price:0},
      pet_types:[],
      dayService:false,
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'select min in 1 pet',
          validUsername: v => v.length >= 3 || "Username must be of minimum 3 character",
        },
    };
  },
  computed:{
    errorStartDate(){
      const errors = [];
      if (this.start_date == null) errors.push('start date');
      return errors;
    },
    errorEndDate(){
      const errors = [];
      if (this.pickup_date == null) errors.push('end date');
      if (this.pickup_date < this.start_date) errors.push('pickup date cannot be before drop off date');
      if (this.pickup_date == this.start_date) errors.push('drop off date and pickup date cannot be same');
      return errors;
    },
    petSelectErrors(){
      const errors = [];
      if (this.petSelected === "Choose Pet(s)") errors.push('Choose pets');
      return errors;
    }
  },
  created: function() {
    this.city = this.$route.query.city == undefined ? "" : this.$route.query.city;
    this.host_id = this.$route.query.query == undefined ? "" : this.$route.query.query;
    if(this.host_id == "" || this.host_id == null){
      router.back();
    }
    this.getHostDetails();
    this.serviceSelected = this.serviceType[0];
    this.getPetsType();
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  },
  methods: {
    increment(num) {
      this.petTypes[num].count = this.petTypes[num].count + 1;
    },
    decrement(num) {
      if (this.petTypes[num].count > 0)
        this.petTypes[num].count = this.petTypes[num].count - 1;
    },
    closeMenu() {
      this.petSelected = "";
      this.petTypes.forEach(el => {
        if (el.count > 0) {
          if (this.petSelected == "") this.petSelected = el.title;
          else this.petSelected = this.petSelected + "," + el.title;
        }
      });
      if (this.petSelected == "") {
        this.petSelected = "Choose Pet(s)";
      }
      this.menu = !this.menu;
      this.isFormValid()
    },

isFormValid(){
  if(this.serviceSelected == 2){
    if(  this.start_date == null && this.pickup_date == null){
      return false;
    }else if(this.pickup_date == this.start_date){
        return false;
    }
  }
  if(this.serviceSelected == 1){
    if(this.start_date == null){
      return false;
    }
  }
  this.valid = false;
},
    getPetsType() {
      let type = "Dog";
      const url = urls.URL + "/pet/type/?type=" + type;
      axios
        .get(url)
        .then(res => {
          res.data.data.forEach(el => {
            if (el.typeid % 2 == 0)
              this.petTypes.push({ title: el.subType, count: 0 });
            else
              this.petTypes.push({
                title: el.subType,
                count: 0,
                class: "grey lighten-4"
              });
          });

          this.petTypes.push({ title: "Cats", count: 0 });
          this.petTypes.push({
            title: "Birds",
            count: 0,
            class: "grey lighten-4"
          });
          this.petTypes.push({ title: "Rabbit / Guinea Pig", count: 0 });
        })
        .catch(err => {
          console.log(err);
        });
    },
    showDialog(index) {
      this.onboarding = index;
      this.dialog = true;
    },
    getHostDetails() {
      this.overlay = true;
      const host_id = this.host_id;
      axios.get(urls.URL + "/petowner/gethost/?hid=" + host_id).then(res => {
        console.log(res);
        if (res.data.status) {
          this.overlay = false;
          let count = 0;
          this.overlay = false;
          this.host_details = res.data.user_details;
          this.host_photos = res.data.gallery;
          this.host_additional_data = res.data.additional_data;
          if(res.data.services.cancellation_policy != null){
            this.cancellation_policy.provided = true;
            this.cancellation_policy.type = res.data.services.cancellation_policy;
          }
           if(JSON.parse(res.data.services.pet_hosting).optional == "on"){
            this.pet_hosting.provided = true;
            this.pet_hosting.price = JSON.parse(res.data.services.pet_hosting).base_rate_pernight; 
            this.serviceType[0].price = this.pet_hosting.price;
          }else{
            this.serviceType.splice(0,1);
            count = count + 1;
          }
          if(JSON.parse(res.data.services.pet_sitting).optional == "on"){
            this.pet_sitting.provided = true;
            this.pet_sitting.price = JSON.parse(res.data.services.pet_sitting).base_rate_pernight; 
            this.serviceType[1-count].price = this.pet_sitting.price;
          }else{
            this.serviceType.splice(1-count,1);
            count = count + 1;
          }
          if(JSON.parse(res.data.services.pet_day_care).optional == "on"){
            this.pet_day_care.provided = true;
            this.pet_day_care.price = JSON.parse(res.data.services.pet_day_care).base_rate_pernight; 
            this.serviceType[2-count].price = this.pet_day_care.price;
          }
          else{
            this.serviceType.splice(2-count,1);
            count = count+ 1;
          }
           if(JSON.parse(res.data.services.house_visits).optional == "on"){
            
            this.house_visits.provided = true;
            this.house_visits.price = JSON.parse(res.data.services.house_visits).base_rate_pernight;
            this.serviceType[3-count].price = this.house_visits.price; 
          }else{
            this.serviceType.splice(3-count,1);
            count = count + 1;
          }
          if(JSON.parse(res.data.services.exercise_walk_service).optional == "on"){
            this.excercise_walk_service.provided = true;
            this.excercise_walk_service.price = JSON.parse(res.data.services.excercise_walk_service).base_rate_pernight; 
          this.serviceType[4-count].price = this.excercise_walk_service.price;
          }else{
            this.serviceType.splice(4-count,1);
             count = count + 1;
          }
           if(JSON.parse(res.data.services.pet_grooming).optional == "on"){
            this.pet_grooming.provided = true;
            this.pet_grooming.price = JSON.parse(res.data.services.pet_grooming).base_rate_pernight; 
            this.serviceType[5-count].price = this.pet_grooming.price;
          }else{
            this.serviceType.splice(5-count,1);
            count = count + 1;
          }
           if(JSON.parse(res.data.services.pet_training).optional == "on"){
            this.pet_training.provided = true;
            this.pet_training.price = JSON.parse(res.data.services.pet_training).base_rate_pernight;
            this.serviceType[6-count].price = this.pet_training.price;
          }else{
            this.serviceType.splice(6-count,1);
          }
          if(res.data.services.pick_drop_service){
            this.pick_drop_service.provided = true;
            this.pick_drop_service.price = res.data.services.pick_drop_service_cost;
        }
          this.pet_types = JSON.parse(res.data.services.type_of_pet);
          this.last_min_bookings = res.data.services.last_min_bookings;
          this.long_term_bookings = res.data.services.long_term_bookings;

        }else{
          router.back();
        }
        
      }).catch(()=>{
router.back();
      }).finally(()=>{
        
      });
    },
    selectChange(){
      this.dayService = this.serviceSelected.type == 2 ? true : false;
    }
  }
};
</script>

<style scoped>
.apply_btn_box {
  width: 100%;
  background: #2c7873;
  display: flex;
  margin: 0 !important;
  padding: 7px 12px;
  text-align: center;
  justify-content: center;
}
.reading-header {
  height: 100%;
  width: 100%;
  display: inline-block;
  line-height: 3rem;
  padding-left: 5px;
  color: #fff;
  background: #2c7873;
}
.rating-count {
  height: 100%;
  width: 100%;
  display: inline-block;
  background: orange;
  color: #ffffff;
  line-height: 3rem;
  text-align: center;
}
.review-rating-count {
  font-size: 0.8rem;
  display: inline-block;
  line-height: 1.2rem;
  margin-left: 2px;
}
.services-box {
  border-radius: 5px;
}
.services-box > .row {
  background: #f5f5f59c;
  margin-left: 0 !important;
  border-radius: 10px;
  margin-top: 4px;
}
label{
  color: #323232 !important;
}
.about-box{
         background: #02706514;
    border-left: 6px solid #009688;
    /* color: #fff; */
}
.top-heading{
  border-left: 5px solid #2c7873;
    background: #dfdfdf;
    padding: 10px 20px;
    color:#2c7873;
}
</style>
