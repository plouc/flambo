import React from 'react'
import Helmet from 'react-helmet'
import { PrismCode } from 'react-prism'


export default () => (
    <div>
        <Helmet title="Deploying flambo on AWS"/>
        <h1>Deploying flambo on AWS</h1>
        <p>
            Flambo provides a sample implementation for AWS deployment using{' '}
            <a href="https://www.terraform.io/" target="_blank">terraform</a>{' '}
            from <a href="https://www.hashicorp.com/" target="_blank">hashicorp</a>.
        </p>

        <blockquote>
            The configuration used is by no means production ready, it's more a starting point if you're willing to deploy flambo in the cloud.<br/>
            I won't be held responsible for any data loss/leak or security issue, if you want to use it on a production environment, you should carefully review the code used, and I'll be very thankful to see a Pull Request helping improve it!
        </blockquote>

        <h2>Setup</h2>
        <p>
            The code is located in the <code>/deploy/aws</code> directory.<br/>
            In order to deploy on AWS, you'll obviously need an AWS account.<br/>
            Then you should have a look at the <a href="https://www.terraform.io/docs/providers/aws/index.html" target="_blank">various approach for authentication using terraform</a>.
        </p>
        <h2>Deploy</h2>
        <p>Before you deploy, you can run a kind of dry-run using the terraform <code>plan</code> command, a convenient command is exposed to achieve this in the project's Makefile:</p>
        <pre>
            <PrismCode>
                {`
make deploy-aws-plan
                `.trim()}
            </PrismCode>
        </pre>
        <p>After reviewing the planned changes (if you wish to do so), you can run the real deploy:</p>
        <pre>
            <PrismCode>
                {`
make deploy-aws
                `.trim()}
            </PrismCode>
        </pre>
    </div>
)