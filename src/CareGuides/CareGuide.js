import React from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { loadStoredPlantByName } from './data';
import {
  COLORS, PROPSHAPES, detailsScreens, centered, safeArea
} from '../shared/constants';

/* COMPONENTS */
import TitleBar from './components/TitleBar';
import SubNavMenu from './components/SubNavMenu';
import CareGuideEssentials from './sections/Essentials';
import CareGuideGrow from './sections/Grow';
import CareGuideIssues from './sections/Issues';
import CareGuideEnjoy from './sections/Enjoy';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subnav: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
  },
  centered,
  safeArea,
});

class CareGuide extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    info: {},
    loading: false,
    screen: detailsScreens.essentials,
  }

  componentDidMount() {
    this.getPlantInfo(this.props.navigation.state.params.name);
  }

  getPlantInfo = (plant) => {
    this.setState({ loading: true });
    loadStoredPlantByName(plant)
      .then((result) => {
        this.setState({
          info: result,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  goToDetail = (screen) => {
    this.setState({ screen });
  }

  renderScreenContent = (screen) => {
    const { info } = this.state;
    if (!info) return (<ActivityIndicator />);

    switch (screen) {
      case detailsScreens.grow:
        return (
          <CareGuideGrow info={this.state.info} />
        );
      case detailsScreens.issues:
        return (
          <CareGuideIssues />
        );
      case detailsScreens.enjoy:
        return (
          <CareGuideEnjoy info={this.state.info} />
        );
      default:
        return <CareGuideEssentials info={this.state.info} />;
    }
  }

  renderSubnav = () => (
    <SubNavMenu onPress={this.goToDetail} active={this.state.screen} />
  )

  render() {
    const { name } = this.props.navigation.state.params;
    const { info, screen, loading } = this.state;
    const subnav = this.renderSubnav();
    const screenContent = this.renderScreenContent(screen);

    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.grass} />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <TitleBar
            onClickBack={() => this.props.navigation.goBack()}
            title={name}
            imageUrl={info.images ? info.images[0].thumbnails.large.url : ''}
          />
          {subnav}
          {screenContent}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

CareGuide.propTypes = {
  navigation: PROPSHAPES.navigation,
};

export default CareGuide;
