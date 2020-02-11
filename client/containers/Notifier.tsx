import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { removeSnackActionCreator } from "../actions/notifications.action";

import { StoreShape } from '../types';


// useSelector to get store state
const FunctionalNotifier: FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector<StoreShape, any>((state) => state.notifications);

  const [displayed, setDisplayed] = useState<any[]>([])

  // Use with react Hook
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: string) => {
    setDisplayed((prev: any[]) => [...prev, id]);
  };

  const removeDisplayed = (id: string) => {
    setDisplayed([...displayed.filter(key => id !== key)]);
  };

  useEffect(() => {
    (notifications || []).forEach(
      // notification but destructured
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          closeSnackbar(key);
          return;
        }


        // Do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;
        // Display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event : any, reason : any, key : any) => {
            if (options.onClose) {
              options.onClose(event, reason, key);
            }
          },
          onExited: (event: any, key: any) => {
            dispatch(removeSnackActionCreator(key));
            removeDisplayed(key);
          }
        });

        // Keep track of snackbars that we've displayed
        storeDisplayed(key);
      }
    );
  }, [notifications]);

  return null;
};

export default FunctionalNotifier;