import React from "react";

const CommentModal = () => {
  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#modalDiscount"
      >
        {/* <strong style={{ fontSize: "10px" }}> */}
        Launch modal
        {/* </strong> */}
      </button>

      {/* <!--Modal: modalDiscount--> */}
      <div
        className="modal fade right"
        id="modalDiscount"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
        data-backdrop="true"
      >
        <div
          className="modal-dialog modal-side modal-bottom-right modal-notify modal-danger"
          role="document"
        >
          {/* <!--Content--> */}
          <div className="modal-content">
            {/* <!--Header--> */}
            <div className="modal-header">
              <p className="heading">
                Discount offer:
                <strong>10% off</strong>
              </p>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" className="white-text">
                  &times;
                </span>
              </button>
            </div>

            {/* <!--Body--> */}
            <div className="modal-body">
              <div className="row">
                <div className="col-3">
                  <p></p>
                  <p className="text-center">
                    <i className="fas fa-gift fa-4x"></i>
                  </p>
                </div>

                <div className="col-9">
                  <p>
                    Sharing is caring. Therefore, from time to time we like to
                    give our visitors small gifts. Today is one of those days.
                  </p>
                  <p>
                    <strong>
                      Copy the following code and use it at the checkout. It's
                      valid for
                      <u>one day</u>.
                    </strong>
                  </p>
                  <h2>
                    <span className="badge">v52gs1</span>
                  </h2>
                </div>
              </div>
            </div>

            {/* <!--Footer--> */}
            <div class="modal-footer flex-center">
              <a
                href="https://mdbootstrap.com/docs/standard/pro/"
                className="btn btn-danger"
              >
                Get it now
                <i className="far fa-gem ml-1 white-text"></i>
              </a>
              <a
                type="button"
                className="btn btn-outline-danger waves-effect"
                data-dismiss="modal"
              >
                No, thanks
              </a>
            </div>
          </div>
          {/* <!--/.Content--> */}
        </div>
      </div>
      {/* <!--Modal: modalDiscount--> */}
    </div>
  );
};

export default CommentModal;
