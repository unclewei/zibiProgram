// common/component/modal.js
Component({
  
  /**
   * 组件的属性列表
   */
  properties: {

    backdrop: {
      type: Boolean,
      value: true
    },

    animated: {
      type: Boolean,
      value: true
    },

    animationOption: {
      type: Object,
      value: {
        duration: 100
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    animation: ''
  },


  ready: function () {

    this.animation = wx.createAnimation({
      duration: this.data.animationOption.duration,
      timingFunction: "linear",
      delay: 0
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideModal: function (e) {
      if (e) {
        let type = e.currentTarget.dataset.type;
        if (type == 'mask' && !this.data.backdrop) {
          return;
        }
      }
      if (this.data.isShow) this._toggleModal();
      this.triggerEvent('hide');
    },

    showModal: function () {
      if (!this.data.isShow) {
        wx.hideKeyboard();
        this._toggleModal();
      }
    },

    _toggleModal: function () {
      if (!this.data.animated) {
        this.setData({
          isShow: !this.data.isShow
        })
      } else {
        let isShow = !this.data.isShow;
        this._executeAnimation(isShow);
      }
    },

    _executeAnimation: function (isShow) {
      let animation = this.animation;

      if (isShow) {

        animation.opacity(0).step();

        this.setData({
          animationData: animation.export(),
          isShow: true
        })

        setTimeout(function () {
          animation.opacity(1).step()
          this.setData({
            animationData: animation.export()
          })
        }.bind(this), 50)
      } else {
        animation.opacity(0).step()
        this.setData({
          animationData: animation.export()
        })

        setTimeout(function () {
          this.setData({
            isShow: isShow
          })
        }.bind(this), this.data.animationOption.duration)
      }

    }

  }
})