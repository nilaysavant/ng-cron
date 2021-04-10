export const highlightSpecificHtml = `<div className="my-cron">
  <ReCron />
</div>`;

export const highlightSpecificScss = 
`.my-cron [tab-name="SECONDS"] {
  .c-and {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;

    &-item[item-value="1"],
    &-item[item-value="20"] {
      .c-and-item-check {
        background-color: red;
        border-radius: 5px;
        color: #fff;
        padding-left: 1.5rem;
      }
    }
  }
}`;

export const highlightSpecificVerticalHtml = 
`<div className="my-vertical-cron">
  <ReCron />
</div>`;

export const highlightSpecificVerticalScss = 
`.my-vertical-cron .c-host {
  display: flex;
  flex-direction: row;

  .c-tabs {
    flex-direction: column;
    border: 0;
    border-right: 1px solid #ccc;

    .c-tab {
      text-align: left;
      border: 0;
      border-radius: 0;
    }
  }

  .c-tab-content {
    padding-top: .5rem;
    padding-left: 1rem;
  }
}`;

export const wholeRedesignHtml = `<ReCron cssClassPrefix="my-" />`;
export const wholeRedesignScss = 
`$prefix: '.my';

#{$prefix}-row {
  overflow: hidden;

  #{$prefix}-col-1 {
    width: calc(100% / 12);
    float: left;
  }

  #{$prefix}-col-2 {
    width: calc(100% / 6);
    float: left;
  }
}

#{$prefix}-form-inline {
  display: flex;
  flex-direction: row;
}

#{$prefix}-form-control {
  margin: 0 .2rem;
}

#{$prefix}-form-check-label {
  padding-left: .4rem;
}`;