import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import { SectionTitle, Body } from '../shared/components';
import { COLORS, space } from '../shared/constants';

const styles = StyleSheet.create({
  container: {
    padding: space[2],
  },
  section: {
    paddingBottom: space[2],
    marginBottom: space[2],
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  finalSection: {
    paddingBottom: space[2],
  },
  imageBlock: {
    marginBottom: space[1],
    alignItems: 'center',
  },
  imagePlaceholder: {
    backgroundColor: COLORS.lightGray,
    height: 200,
    flex: 1,
    justifyContent: 'center',
    marginBottom: space[1],
    alignItems: 'center',
  }
});

const GettingStarted = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.section}>
      <View style={styles.imagePlaceholder}>
        <Body weight="bold" color="white">Image Not Available</Body>
      </View>
      <SectionTitle>1. Unpack the Box.</SectionTitle>
      <Body>
Bust out your plant(s), your soil, mulch if you have it, and the container.
 This is gonna be a piece of cake. Really nothing fancy here. That’s the point.
      </Body>
    </View>
    <View style={styles.section}>
      <View style={styles.imagePlaceholder}>
        <Body weight="bold" color="white">Image Not Available</Body>
      </View>
      <SectionTitle>2. Get Your Hands Dirty.</SectionTitle>
      <Body>
Throw soil in the container like a madperson. If you’ve got a small container,
 put about 1/4 of the soil in at first. Large container: fill it about 3/4 of the
  way. Now, mix it around with your hands. There’s a good deal of research that
   shows this is good for people. Soil has been around a lot longer than phone
    screens, it turns out.
      </Body>
    </View>
    <View style={styles.section}>
      <View style={styles.imagePlaceholder}>
        <Body weight="bold" color="white">Image Not Available</Body>
      </View>
      <SectionTitle>3. Transplant.</SectionTitle>
      <Body>
Soak the soil of your baby plant (not the leaves) with water to make it nice and
 squishy. With your hand covering the soil, flip the plant over, squeeze the sides,
  and slide the plant out of its container. Loosen the roots from the bottom with
   your fingers – it’s called tickling the roots, but that word makes us giggle –
    and place the plant in the center of the container, surround it with soil up
     to say 9/10 of the way to the top, and level it out.
      </Body>
    </View>
    <View style={styles.section}>
      <View style={styles.imagePlaceholder}>
        <Body weight="bold" color="white">Image Not Available</Body>
      </View>
      <SectionTitle>4. Mulch It, Baby</SectionTitle>
      <Body>
Some plants boxes contain mulch, which is just a word for organic stuff you throw
 on top so the soil stays cool and moist, so you water less. It also prevents
  weeds from growing. You love mulch now. If you got it, congratulations! You won
   mulch! If not, it means your plant doesn’t need it so just top your pot with
    soil and move to Step 5. Anyway, if you did get it, fill the rest of the
     container with that mulch to the top, or as far as it gets you. You’re
      looking for about an inch of mulch for small pots, maybe 2-3 inches for
       large ones, so that the top of the mulch reaches close to the top of the
        container.
      </Body>
    </View>
    <View style={styles.finalSection}>
      <View style={styles.imagePlaceholder}>
        <Body weight="bold" color="white">Image Not Available</Body>
      </View>
      <SectionTitle>5. Seal the deal</SectionTitle>
      <Body>
Oh man, this has been fun. Lightly water the soil (not the foliage!) to seal the
 deal, make it all one. You’re good when it starts to drip out the bottom. Refer
  to your care guide for placement, though in general you’re going to want it
   outside in as much sun as you can give it. And while we’re at it, it’s good
    for people to be outside too, in the sun, in the wind, with the birds. We
     hope getting set up has brightened your day a little bit.
      </Body>
    </View>
  </ScrollView>
);

GettingStarted.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default GettingStarted;
