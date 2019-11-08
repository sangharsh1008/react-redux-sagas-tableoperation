// @flow
/** @jsx jsx **/

import _ from 'lodash';
import { translate } from 'common/utils/resourceUtils';
import k1Constants from 'common/constants/k1Constants';
import AppUtils from 'common/utils/appUtils';
import help_card from 'common/images/help_cardPic@2x.png';
import {
  HelpDialogHeader,
  HelpDialogText,
  HelpDialogContainer,
  HelpDialogPicture,
  HelpDialogSubHeader,
} from './styles/k1LoginModal';
import { jsx } from '@emotion/core';
import { OUTLINESTYLE } from 'common/styles/accessibility';

type Props = {
  cdnDomain: string,
};

const K1LoginHelpDialog = ({ cdnDomain }: Props) => {
  const isMSEdge = AppUtils.isBrowserMSEdge(_.get(navigator, 'userAgent', ''));
  const linkAttributes = !isMSEdge ? { target: '_blank' } : {};

  return (
    <HelpDialogContainer id="k1login-help-container">
      <HelpDialogHeader>{translate('k1Login:HELP_K1_LOGIN_HEADER')}</HelpDialogHeader>

      <HelpDialogText id="k1login-help-text" className="k1login-help-text">
        {translate('k1Login:HELP_K1_LOGIN_TEXT')}
      </HelpDialogText>
      <HelpDialogText id="k1login-help-link" className="k1login-help-text">
        <a
          className="k1login-help-link-a"
          id="k1login-help-link-aa"
          href={k1Constants.K1_LOGIN_HELP_PDF}
          tabIndex="0"
          aria-label={translate('k1Login:HELP_K1_LOGIN_TEXT2')}
          css={OUTLINESTYLE}
          {...linkAttributes}
        >
          {translate('k1Login:HELP_K1_LOGIN_TEXT2')}
        </a>
      </HelpDialogText>
      <section>
        <HelpDialogSubHeader id="k1login-help-header2">
          {translate('k1Login:HELP_K1_LOGIN_HEADER2')}
        </HelpDialogSubHeader>
        <figure id="k1login-help-picture" tabIndex="0" css={OUTLINESTYLE}>
          <HelpDialogPicture src={help_card} alt={translate('k1Login:K1LOGIN_HELP_CARD_HEADER')} />
        </figure>
      </section>
    </HelpDialogContainer>
  );
};

export default K1LoginHelpDialog;
