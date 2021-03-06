"use strict";

Polymer({
  is: 'project-selector',
  behaviors: [Polymer.LocalizationBehavior],
  properties: {
    guides: {
      type: Array,
      value: []
    },
    guide: {
      type: Object,
      computed: "_computeGuide(selectedGuide)",
      observer: "_onGuideChange"
    },
    selectedGuide: {
      type: Number,
      value: -1
    },
    viewModes: {
      type: Array,
      value: ["view-large-icons", "view-small-icons", "view-list"]
    },
    selectedViewMode: {
      type: Number,
      value: -1,
      observer: "_onViewModeChange"
    }
  },

  ready: function ready() {
    var _this = this;

    this._startLoading();
    this._guideLoader().all().then(function (guides) {
      _this.guides = guides;
      _this.selectedGuide = window.STORAGE.getItem("selected-guide") || 0;
    }).catch(function () {
      return _this._stopLoading();
    });

    this.selectedViewMode = parseInt(window.STORAGE.getItem("selected-view-mode")) || 0;

    setTimeout(function () {
      _this.$.viewModeSelector.label = _this.localize(_this.viewModes[_this.selectedViewMode]);
    }, 0);
  },

  goToExercise: function goToExercise(event) {
    this._ide().hideProjectSelectorModal();

    var exercise = event.model.item;

    this._goTo(this._guideLoader().makeUrlFor(this.guide, exercise));
  },

  loadFromFile: function loadFromFile() {
    window.BUS.fire("load-project-from-file");
  },

  getImageSize: function getImageSize(selectedViewMode) {
    if (selectedViewMode === 1) return 100;else if (selectedViewMode === 2) return 50;else return 200;
  },

  getExerciseCssClass: function getExerciseCssClass(selectedViewMode) {
    if (selectedViewMode === 1) return "exercise-small";else if (selectedViewMode === 2) return "exercise-list";else return "exercise-large";
  },

  getSeparatorCssClass: function getSeparatorCssClass(selectedViewMode) {
    return selectedViewMode === 2 ? "separator-list" : "";
  },

  getItemTitle: function getItemTitle(name, selectedViewMode) {
    var lastDot = name.lastIndexOf(".");
    if (!lastDot) return name;

    return "<strong>" + name.substring(0, lastDot) + "</strong>" + (selectedViewMode !== 2 ? "<br>" : "") + name.substring(lastDot + 1);
  },

  _loadCurrentGuide: function _loadCurrentGuide() {
    var _this2 = this;

    var TheGuideLoader = this._guideLoader();
    new TheGuideLoader(this.guide).getExercises().then(function (exercises) {
      _this2.exercises = exercises;
      _this2._resizePopup();
    }).always(function () {
      _this2._stopLoading();
    });
  },

  _computeGuide: function _computeGuide(selectedGuide) {
    return this.guides[selectedGuide];
  },

  _onGuideChange: function _onGuideChange() {
    window.STORAGE.setItem("selected-guide", this.selectedGuide);
    this._startLoading();
    this._loadCurrentGuide();
  },

  _onViewModeChange: function _onViewModeChange() {
    if (this.selectedViewMode === -1) return;
    window.STORAGE.setItem("selected-view-mode", this.selectedViewMode);
  },

  _startLoading: function _startLoading() {
    var ide = this._ide();
    if (ide) ide.startLoading("isLoadingProjects");
  },

  _stopLoading: function _stopLoading() {
    var ide = this._ide();
    if (ide) ide.stopLoading("isLoadingProjects");
  },

  _resizePopup: function _resizePopup() {
    document.querySelector("#projectSelectorModal").notifyResize();
  },

  _goTo: function _goTo(route) {
    return document.querySelector("app-router").go(route);
  },

  _isEmpty: function _isEmpty(exercises) {
    return exercises.length === 0;
  },

  _isList: function _isList(selectedViewMode) {
    return selectedViewMode === 2;
  },

  _guideLoader: function _guideLoader() {
    return window.GBS_DESKTOP ? DesktopGuideLoader : GitHubGuideLoader;
  },
  _ide: function _ide() {
    return document.querySelector("#gobstones-ide");
  }
});