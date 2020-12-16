import React, { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { countNumber } from '../../actions/new'
import { IRootState } from '../../reducer';
import { connect, useDispatch } from 'react-redux';

export interface IPropsNew {
  countNumber : Function ,
  count: number
}

function News({ countNumber, count }: IPropsNew) {
  let [poiter, setPoiter] = useState(0);
  useEffect(() => {

  }, [])

  const onPressLearnMore = () => {
    poiter = count
    setPoiter(poiter++)
    countNumber(poiter) 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count && count}</Text>
      <Button
        onPress={onPressLearnMore}
        title="increment"
        accessibilityLabel="++" color="red"
         />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black'
  }
});

const mapStateToProps = ({ newFeed }: IRootState) => ({
  count: newFeed.count
});

const mapDispatchToProps = { countNumber };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(News);
