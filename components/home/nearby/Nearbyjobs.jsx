import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
// import { useState } from 'react'
import { useRouter } from 'expo-router'

import styles from './nearbyjobs.style'
import {COLORS, SIZES} from "../../../constants"
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'


//useFetch hook
import useFetch from "../../../hooks/useFetch"

const Nearbyjobs = () => {
  const router = useRouter()
  // const isLoading = false
  // const error = false;

  const {data, isLoading, error} = useFetch('search', {query: "react developer", num_pages: 1});



  // console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary}/>
        ): error ? (
          <Text>Something went wrong</Text>
        ) : (
          //loop through the data
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              //job-details = folder
              handleNavigate={() =>  router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )
      }
      </View>
    </View>
  )
};

export default Nearbyjobs;