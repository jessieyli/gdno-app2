import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import { SectionTitle, Body, SubHead } from '../shared/components';
import { COLORS, space } from '../shared/constants';
import step1 from '../shared/assets/gettingstarted_step1.png';
import step2 from '../shared/assets/gettingstarted_step2.png';
import step3 from '../shared/assets/gettingstarted_step3.png';
import step5 from '../shared/assets/gettingstarted_step5.png';

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
    width: 375,
    height: 207,
  },
  imagePlaceholder: {
    backgroundColor: COLORS.lightGray,
    height: 160,
    flex: 1,
    justifyContent: 'center',
    marginBottom: space[1],
    alignItems: 'center',
  }
});

const GettingStarted = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.section}>
      <SubHead>
Now that you have your Gardenio grow box, roll up those sleeves and get ready to
 pick dirt out from under those fingernails. No idea how to garden? No sweat.
  Getting started is as easy following these five steps.
      </SubHead>
    </View>
    <View style={styles.section}>
      <Image
        style={styles.imageBlock}
        source={step1}
      />
      <SectionTitle>1. Unpack Your Box</SectionTitle>
      <Body>
This is the first step of your gardening journey. Begin by unboxing your
 plant(s), your soil, and your plant’s container. Depending on your order, your
  box may include mulch as well. Before you proceed to the next step, make sure
   you aren’t missing anything.

      </Body>
    </View>
    <View style={styles.section}>
      <Image
        style={styles.imageBlock}
        source={step2}
      />
      <SectionTitle>2. Dig In</SectionTitle>
      <Body>
Take your soil and start filling up your container. You’ll require a different
 amount of soil depending on the size of your container. If you’re working with
  a small container, fill it about ¼ of the way. If it’s a large container, ¾
   of the way is the magic number. Gardening is about touching the earth and
    getting your hands dirty. So get in there and mix that soil around!
      </Body>
    </View>
    <View style={styles.section}>
      <Image
        style={styles.imageBlock}
        source={step3}
      />
      <SectionTitle>3. Transfer Your Plant</SectionTitle>
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
      <Image
        style={styles.imageBlock}
        source={step5}
      />
      <SectionTitle>5. Seal the Deal</SectionTitle>
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
