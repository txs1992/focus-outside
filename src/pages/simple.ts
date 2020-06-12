import { Vue, Component } from 'vue-property-decorator'
import { bind as focusBind, unbind as focusUnbind } from '../../packages/index'
// import { bind as focusBind, unbind as focusUnbind } from '../../dist/focus-outside'

@Component({
  name: 'simple',
})
export default class PageSimple extends Vue {
  outsideOne() {
    console.log('outsideOne')
  }

  outsideTwo() {
    console.log('outsideTwo')
  }

  outsideThree() {
    console.log('outsideThree')
  }

  outsideFour() {
    console.log('outsideFour')
  }

  mounted() {
    const btnOne = (this.$refs['btn-one'] as any).$el
    const btnTwo = (this.$refs['btn-two'] as any).$el
    const btnThree = (this.$refs['btn-three'] as any).$el
    const btnFour = (this.$refs['btn-four'] as any).$el

    if (btnOne && btnTwo && btnThree && btnFour) {
      focusBind(btnOne, this.outsideOne, 'btn', 'out-one')
      focusBind(btnTwo, this.outsideTwo, 'btn', 'out-two')
      focusBind(btnThree, this.outsideThree, 'key-one', 'out-three')
      focusBind(btnFour, this.outsideFour, 'key-two', 'out-four')
    }
  }

  beforeDestroy() {
    const btnOne = (this.$refs['btn-one'] as any).$el
    const btnTwo = (this.$refs['btn-two'] as any).$el
    const btnThree = (this.$refs['btn-three'] as any).$el
    const btnFour = (this.$refs['btn-four'] as any).$el

    if (btnOne && btnTwo && btnThree && btnFour) {
      focusUnbind(btnOne)
      focusUnbind(btnTwo)
      focusUnbind(btnThree)
      focusUnbind(btnFour)
    }
  }
}
