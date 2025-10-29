import FooterServer from "@/components/main_components/footer_server";
import React from "react";

export default function TermsOfService() {
  return (
    <div>
      <div className="border-2 m-6 p-6">
        <h1 className="text-2xl font-semibold py-4">Terms of Service</h1>

        <div>
          <h1>
            <span className="text-lg font-semibold">Services:</span>
            <br />
            <span>
              {" "}
              Fayida Academy provides online mock exams and practice testing
              services to help students prepare for their upcoming examinations.
              These services include access to a library of practice tests,
              automated scoring, automaic correction checking.
            </span>{" "}
            <br />
            <br />
            <span className="text-lg font-semibold">
              {" "}
              Registration and Accounts:
            </span>{" "}
            <br /> To use our services, you must create an account with Fayida
            Academy. You are responsible for maintaining the confidentiality of
            your account credentials and for all activities that occur under
            your account. You must use your own account to access the mock exams
            and practice tests - sharing or using someone else&apos;s account is
            strictly prohibited. <br /> <br />
            <span className="text-lg font-semibold">Fees and Payments:</span>
            <br />
            <span>
              {" "}
              Fayida Academy&apos;s mock exam services are subject to fees,
              which are outlined on our website. All payments must be made in
              advance, and we reserve the right to suspend or terminate your
              account for non-payment.
            </span>{" "}
            <br />
            <br />{" "}
            <span className="text-lg font-semibold">
              {" "}
              Intellectual Property:{" "}
            </span>
            <br />
            <span>
              Fayida Academy uses official past exam papers and questions from
              accredited examination bodies, as well as custom-created mock
              exams developed by our team of subject matter experts.If any
              content is marked as owned by Fayida Academy, it is strictly
              prohibited to distribute or share such content outside of the
              platform.
            </span>{" "}
            <br /> <br />
            <span className="text-lg font-semibold"> User Conduct:</span>
            <br />
            <span>
              {" "}
              You agree to use the Fayida Academy platform only for lawful
              purposes and in a manner that does not infringe on the rights of
              others or restrict or inhibit their use and enjoyment of the
              platform.
            </span>{" "}
            <br />
            <br /> <span className="text-lg font-semibold">
              {" "}
              Disclaimers:{" "}
            </span>{" "}
            <br />
            <span>
              {" "}
              Fayida Academy makes no warranties or representations about the
              accuracy, completeness, or reliability of the mock exam content.
              The platform is provided &apos;as is&apos; without any guarantees
              of performance or fitness for a particular purpose.
            </span>{" "}
            <br />
            <br />{" "}
            <span className="text-lg font-semibold">
              {" "}
              Limitation of Liability:{" "}
            </span>{" "}
            <br />
            <span>
              {" "}
              Fayida Academy shall not be liable for any indirect, special,
              incidental, or consequential damages arising out of or related to
              your use of the platform.
            </span>{" "}
            <br /> <br />
            <span className="text-lg font-semibold"> Termination:</span>
            <br />
            <span>
              Fayida Academy reserves the right to suspend or terminate your
              account at any time for any reason, including if we reasonably
              believe you have violated these terms and conditions.
            </span>{" "}
            <br />
            <br />
            <span className="text-lg font-semibold">Governing Law:</span>
            <br />{" "}
            <span>
              {" "}
              These terms and conditions shall be governed by and construed in
              accordance with the laws of Jurisdiction.{" "}
            </span>
          </h1>
        </div>
      </div>

      <FooterServer />
    </div>
  );
}
